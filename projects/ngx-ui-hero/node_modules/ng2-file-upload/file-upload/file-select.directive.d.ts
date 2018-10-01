import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader } from './file-uploader.class';
export declare class FileSelectDirective {
    uploader: FileUploader;
    onFileSelected: EventEmitter<File[]>;
    protected element: ElementRef;
    constructor(element: ElementRef);
    getOptions(): any;
    getFilters(): any;
    isEmptyAfterSelection(): boolean;
    onChange(): any;
}
