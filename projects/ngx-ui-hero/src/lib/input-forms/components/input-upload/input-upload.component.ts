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
    @Input() dropZonePlaceholder?: string = 'Another drop zone';
    @Input() disabled?: boolean = false;
    @Input() autoUpload?: boolean = true;
    @Input() showDropZone?: boolean = false;
    @Input() showQueue?: boolean = false;
    @Input() maxFileSizeInMegaBytes?: number = 4;
    @Input() queueLimit?: number = 10;
    @Input() selectButtonIcon?: string = 'fa fa-folder';
    @Input() selectButtonLabel?: string = 'Select';
    @Input() removeButtonIcon?: string = 'fa fa-trash';
    @Input() removeButtonLabel?: string = 'Remove';
    @Input() allowedExtensions?: Array<string>;
    @Input() fileTypeErrorMessage?: string = 'The file type [{extension}] is not allowed.';
    @Input() fileSizeErrorMessage?: string = 'The file size limit is {maxFileSize}MB.';
    @Output() onSuccessFileAdded = new EventEmitter<any>();
    @Output() onSuccessUpload = new EventEmitter<any>();
    @Output() onError = new EventEmitter<any>();
    @Output() onClear = new EventEmitter();

    selectedFileName: string;
    errorMessage: string;
    uploader: FileUploader;
    hasDropZoneOver:boolean = false;

    constructor() { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            autoUpload: this.autoUpload,
            maxFileSize: this.maxFileSizeInMegaBytes * 1000000,
            queueLimit: this.queueLimit
        });

        this.handleUploaderEvents();        
    }

    Clear(): void {
        this.selectedFileName = null;
        this.errorMessage = null;
        this.uploader.clearQueue();
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

    private handleUploaderEvents(): void {
        this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
            this.setSelectedFile(item);
            this.onSuccessUpload.emit({item, response, status});    
            console.log('onSuccessItem', item, response, status);        
        };
        this.uploader.onAfterAddingFile = (item: FileItem) => {
            if (this.validate(item)) {
                this.setSelectedFile(item);
                this.onSuccessFileAdded.emit(item);
                console.log('onAfterAddingFile', item);
            }            
        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
            this.Clear();
            this.onError.emit({item, response, status});
            console.log('onErrorItem', item, response, status);
        };
        this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
            this.Clear();

            if (filter.name == 'fileSize') {
                this.errorMessage = this.fileSizeErrorMessage.replace('{maxFileSize}', `${this.maxFileSizeInMegaBytes}`);
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

        this.selectedFileName = item.file.name;
    }
    private validate(item: any): boolean {
        this.selectedFileName = null;
        this.errorMessage = null;

        if (!this.validateFileType(item)) {                
            this.uploader.cancelItem(item);
            return false;
        }

        return true;
    }
}
