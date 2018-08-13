import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';

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
    // @Input() showQueue?: boolean = false;
    @Input() maxFileSize?: number = 4;
    // @Input() queueLimit?: number = 10;
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

    selectedFile: any;
    selectedFileName: string = '';
    errorMessage: string;
    uploader: FileUploader;
    hasDropZoneOver:boolean = false;

    constructor() { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            autoUpload: this.autoUpload,
            maxFileSize: this.maxFileSize * 1000000,
            // queueLimit: this.queueLimit
        });

        this.handleUploaderEvents();        
    }

    Clear(): void {
        this.selectedFile = null;
        this.selectedFileName = '';
        this.errorMessage = null;
        this.uploader.clearQueue();
        this.uploader.cancelAll();
        this.onClear.emit();
    }

    StartUploadManually(): void {
        if (this.selectedFileName) {
            this.uploader.uploadAll();
        }
    }
 
    OnFileOver(e:any): void {
      this.hasDropZoneOver = e;
    }
    
    SetSelectedFileText(fileName: string): void {
        this.selectedFileName = fileName;
    }

    private handleUploaderEvents(): void {
        this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
            this.setSelectedFile(item);
            this.onSuccessUpload.emit({item, response, status});      
        };
        this.uploader.onAfterAddingFile = (item: FileItem) => {
            if (this.validate(item)) {
                if (this.uploader.queue.length > 1) {
                    this.uploader.removeFromQueue(this.uploader.queue[0]);
                }
                
                this.setSelectedFile(item);
                this.onSuccessFileAdded.emit(item);
            }            
        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
            this.Clear();
            this.onError.emit({item, response, status});
        };
        this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
            this.Clear();

            if (filter.name == 'fileSize') {
                this.errorMessage = this.fileSizeErrorMessage.replace('{maxFileSize}', `${this.maxFileSize}`);
            } else {
                console.error('Error on trying to add this file.', item, filter);
            }
        };
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            this.validate(item);
        };
    }
    private validateFileType(item: FileItem): boolean {
        if (!this.allowedExtensions || this.allowedExtensions.length == 0) {
            return true;
        }

        let extension = item.file.name.split('.')[1];
        let result = this.allowedExtensions.find(x => x == extension);

        if (result == undefined || result == null) {
            this.errorMessage = this.fileTypeErrorMessage.replace('{extension}', extension);
            return false;
        }

        return true;
    }
    private setSelectedFile(item: any): void {
        if (!item || !item.file) {
            return;
        }

        this.SetSelectedFileText(item.file.name);
    }
    private validate(item: any): boolean {
        this.selectedFileName = null;
        this.errorMessage = null;

        if (!this.validateFileType(item)) {
            this.selectedFile = null;
            this.uploader.cancelItem(item);
            this.uploader.clearQueue();
            return false;
        }

        return true;
    }
}
