import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { retry } from 'rxjs/operators';

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
    @Input() chunk?: boolean = false;
    @Input() chunkSize?: number = 1048576;
    @Input() showQueue?: boolean = false;
    @Input() maxFileSize?: number = 4;
    @Input() selectButtonIcon?: string = 'fa fa-folder';
    @Input() selectButtonLabel?: string = 'Select';
    @Input() removeButtonIcon?: string = 'fa fa-trash';
    @Input() removeButtonLabel?: string = 'Remove';
    @Input() allowedExtensions?: Array<string>;
    @Input() fileTypeErrorMessage?: string = 'The file type [{extension}] is not allowed.';
    @Input() fileSizeErrorMessage?: string = 'This file exceeds the max file size allowed of {maxFileSize}MB.';
    @Input() maxFileSizeLabel?: string = 'Max file size:';
    @Input() allowedExtensionsLabel?: string = 'Allowed extensions:';
    @Output() onSuccessFileAdded = new EventEmitter<any>();
    @Output() onSuccessUpload = new EventEmitter<any>();
    @Output() onError = new EventEmitter<any>();
    @Output() onClear = new EventEmitter();

    selectedFileBlob: any;
    selectedFileModel: any;
    selectedFileName: string = '';
    errorMessage: string;
    uploader: FileUploader;
    hasDropZoneOver: boolean = false;
    chunks: any[];

    constructor(
      private http: HttpClient
    ) { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            autoUpload: this.autoUpload,
            maxFileSize: this.maxFileSize * 1000000,
        });

        this.handleUploaderEvents();
    }

    Clear(): void {
        this.selectedFileModel = null;
        this.selectedFileName = '';
        this.errorMessage = null;
        this.chunks = null;
        this.uploader.clearQueue();
        this.uploader.cancelAll();
        this.onClear.emit();
    }

    StartUploadManually(): void {
        if (!this.selectedFileBlob) {
          return;
        }

        if (this.chunk && this.chunks && this.chunks.length > 0) {
          this.startChunkUpload();
        } else {
          this.startSingleUpload();
        }
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

    private startSingleUpload(): void {
      this.uploader.uploadAll();
    }
    private startChunkUpload(): void {
        let chunksPromises: Array<Promise<void>> = [];

        for (let i = 0; i < this.chunks.length; i++) {
            chunksPromises.push(this.sendChunk(this.chunks[i]));
        }

        Promise.all(chunksPromises)
            .then(()=> {
                console.log('FIM');
            })
            .catch(()=> {
                console.error('DEU RUIM');
            });
    }
    private sendChunk(chunk: any): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            chunk.progress = Math.random() * 10;

            let formData = new FormData();
            formData.append("file", chunk.blob, chunk.name);

            this.http.post('http://localhost:64538/api/files/chunk', formData, { withCredentials: false })
                .pipe(retry(3))
                .subscribe(
                    result => {
                        chunk.progress = 100;
                        resolve();
                    },
                    error => {
                        console.error(error);
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
            this.SetSelectedFileName(item.file.name);
            this.onSuccessUpload.emit({item, response, status});
        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
            this.Clear();
            this.onError.emit({item, response, status});
        };
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            this.validate(item);
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

        this.onSuccessFileAdded.emit(file);
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
