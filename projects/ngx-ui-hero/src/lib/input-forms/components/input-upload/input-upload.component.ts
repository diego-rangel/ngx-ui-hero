import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
    selector: 'input-upload',
    templateUrl: 'input-upload.component.html'
})

export class InputUploadComponent implements OnInit {
    @Input() url: string;
    @Input() label?: string;
    @Input() placeholder?: string = 'Select a file to upload...';
    @Input() disabled?: boolean = false;
    @Input() autoUpload?: boolean = true;
    @Input() showDropZone?: boolean = false;
    @Input() showQueue?: boolean = false;
    @Input() multiple?: boolean = false;
    @Input() maxFileSizeInMegaBytes?: number = 4;
    @Input() queueLimit?: number = 10;
    @Input() selectButtonIcon?: string = 'fa fa-folder';
    @Input() selectButtonLabel?: string = 'Select';
    @Input() removeButtonIcon?: string = 'fa fa-trash';
    @Input() removeButtonLabel?: string = 'Remove';
    @Input() allowedExtensions?: Array<string>;
    @Input() fileTypeErrorMessage?: string = 'The file type [{extension}] is not allowed.';
    @Input() fileSizeErrorMessage?: string = 'The file size limit is {maxFileSize}MB.';
    @Output() onError = new EventEmitter<any>();

    selectedFileName: string;
    errorMessage: string;
    uploader: FileUploader;

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

    private handleUploaderEvents(): void {
        this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
            console.log('onSuccessItem', item, response, status);

        };
        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
            // console.log('onErrorItem', item, response, status);
            this.onError.emit({item, response, status});
        };
        this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any) => {
            if (filter.name == 'fileSize') {
                this.errorMessage = this.fileSizeErrorMessage.replace('{maxFileSize}', `${this.maxFileSizeInMegaBytes}`);
            } else {
                console.error('Error on trying to add this file.', item, filter);
            }
        };
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            this.errorMessage = null;

            if (!this.validateFileType(item)) {                
                this.uploader.cancelItem(item);
            }
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
}
