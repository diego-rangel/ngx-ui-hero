import { Component, OnInit, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { retry } from 'rxjs/operators';

import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';

let identifier = 0;

@Component({
    selector: 'input-upload',
    templateUrl: 'input-upload.component.html',
    styleUrls: ['input-upload.component.scss']
})
export class InputUploadComponent implements OnInit {
    @Input() url: string;
    @Input() label?: string;
    @Input() placeholder?: string = 'Select a file to upload...';
    @Input() dropZonePlaceholder?: string = 'Drag & drop a file to import.';
    @Input() disabled?: boolean = false;
    @Input() autoUpload?: boolean = true;
    @Input() showDropZone?: boolean = false;
    @Input() showQueue?: boolean = false;
    @Input() chunk?: boolean = false;
    @Input() chunkSize?: number = 1048576;
    @Input() chunkRetries?: number = 3;
    @Input() maxFileSize?: number = 0;
    @Input() withCredentials?: boolean = false;
    @Input() selectButtonIcon?: string = 'fa fa-folder';
    @Input() selectButtonLabel?: string = 'Select';
    @Input() removeButtonIcon?: string = 'fa fa-trash';
    @Input() removeButtonLabel?: string = 'Remove';
    @Input() allowedExtensions?: Array<string>;
    @Input() fileTypeErrorMessage?: string = 'The file type [{extension}] is not allowed.';
    @Input() fileSizeErrorMessage?: string = 'This file exceeds the max file size allowed of {maxFileSize}MB.';
    @Input() maxFileSizeLabel?: string = 'Max file size:';
    @Input() allowedExtensionsLabel?: string = 'Allowed extensions:';
    @Output() onFileAdded = new EventEmitter<any>();
    @Output() onUploadComplete = new EventEmitter();
    @Output() onChunkFileUpload = new EventEmitter<any>();
    @Output() onError = new EventEmitter<any>();
    @Output() onClear = new EventEmitter();

    public identifier = `input-upload-${identifier++}`;

    selectedFileBlob: any;
    selectedFileModel: any;
    selectedFileName: string = '';
    errorMessage: string;
    uploader: FileUploader;
    hasDropZoneOver: boolean = false;
    chunks: any[];
    chunkProgress: number = 0;

    constructor(
        @Inject(INPUT_FORMS_CONFIG) @Optional() config: InputFormsConfig,
        private http: HttpClient
    ) {
        if (config && config.upload) {
            Object.assign(this, config.upload);
        }        
    }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            autoUpload: false,
            maxFileSize: this.maxFileSize * 1000000,
        });

        this.handleUploaderEvents();
    }

    Clear(): void {
        this.chunkProgress = 0;
        this.selectedFileModel = null;
        this.selectedFileName = '';
        this.errorMessage = null;
        this.chunks = null;
        this.uploader.clearQueue();
        this.uploader.cancelAll();
        this.onClear.emit();
    }

    StartUploadManually(): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            if (!this.selectedFileBlob) {
                reject();
                return;
            }

            this.onUploadComplete.subscribe(result => resolve(), error => reject(error));
            this.onError.subscribe(result => { reject(); });

            if (this.chunk && this.chunks && this.chunks.length > 0) {
                this.startChunkUpload();
            } else {
                this.startSingleUpload();
            }
        });

        return promise;
    }

    SetSelectedFileName(fileName: string): void {
        this.selectedFileName = fileName;
    }

    OnFileOver(e:any): void {
      this.hasDropZoneOver = e;
    }
    OnFileChange(event: any): void {
        if (event.target.files[0]) {
            this.addSelectedFileForManualUploading(event.target.files[0]);
        }        
    }
    OnFileDrop(event: any): void {
        if (event[0]) {
            this.addSelectedFileForManualUploading(event[0]);
        }      
    }

    HasSelectedFile(): boolean {
        return this.selectedFileBlob != null && this.selectedFileBlob != undefined;
    }

    private startSingleUpload(): void {
      this.uploader.uploadAll();
    }
    private startChunkUpload(): void {
        let chunksPromises: Array<Promise<void>> = [];

        this.chunkProgress = 0;

        for (let i = 0; i < this.chunks.length; i++) {
            chunksPromises.push(this.sendChunk(this.chunks[i]));
        }

        Promise.all(chunksPromises)
            .then(()=> {
                this.chunkProgress = 100;
                this.onUploadComplete.emit();
            })
            .catch(error => {
                this.onError.emit(error);
            });
    }
    private sendChunk(chunk: any): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            let formData = new FormData();
            formData.append("file", chunk.blob, chunk.name);

            this.http.post(this.url, formData, { withCredentials: this.withCredentials })
                .pipe(retry(this.chunkRetries))
                .subscribe(
                    result => {
                        this.chunkProgress += 100 / this.chunks.length;
                        this.onChunkFileUpload.emit(chunk.blob);
                        resolve();
                    },
                    error => {
                        reject();
                    }
                );
        });

        return promise;
    }
    private splitSelectedFileInChunks(): void {
      this.chunks = [];
      let file: File = this.selectedFileBlob;
      let fileSize = file.size;
      let start = 0;
      let end = this.chunkSize;
      let chunksCount = 0;
      let chunkGuid = Math.random()
        .toString()
        .replace("0.", "");

      if (fileSize % this.chunkSize == 0) {
        chunksCount = fileSize / this.chunkSize;
      } else {
        chunksCount = Math.floor(fileSize / this.chunkSize) + 1;
      }

      for (let i = 0; i < chunksCount; i++) {
        this.chunks.push({
          name: `${chunkGuid}_${i}`,
          blob: file.slice(start, end)
        });

        start = end;
        end = start + this.chunkSize;
      }
    }
    private handleUploaderEvents(): void {
        this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
            this.onUploadComplete.emit(item);
        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
            this.Clear();
            this.onError.emit({item, response, status});
        };
    }
    private addSelectedFileForManualUploading(file: any): void {
      this.selectedFileBlob = null;

      if (!file) {
        return;
      }

      if (this.validate(file)) {
        this.selectedFileBlob = file;
        this.SetSelectedFileName(file.name);

        if (this.uploader.queue.length > 1) {
            this.uploader.removeFromQueue(this.uploader.queue[0]);
        }

        if (this.chunk) {
          this.splitSelectedFileInChunks();
        }

        this.onFileAdded.emit(file);

        if (this.autoUpload) {
            this.StartUploadManually();
        }
      }
    }
    private validate(item: any): boolean {
        this.selectedFileName = null;
        this.errorMessage = null;

        if (!this.validateFileType(item) || !this.validateFileSize(item)) {
            this.selectedFileModel = null;
            this.uploader.clearQueue();
            return false;
        }

        return true;
    }
    private validateFileType(file: any): boolean {
        if (!this.allowedExtensions || this.allowedExtensions.length == 0) {
            return true;
        }

        let extensionArray = file.name.split('.');
        let extension = extensionArray[extensionArray.length - 1];
        let result = this.allowedExtensions.find(x => x == extension);

        if (result == undefined || result == null) {
            this.errorMessage = this.fileTypeErrorMessage.replace('{extension}', extension);
            return false;
        }

        return true;
    }
    private validateFileSize(file: any): boolean {
        if (this.maxFileSize == 0) {
            return true;
        }

        if (file.size > this.maxFileSize * 1048576) {
            this.errorMessage = this.fileSizeErrorMessage.replace('{maxFileSize}', `${this.maxFileSize}`);
            return false;
        }

        return true;
    }
}
