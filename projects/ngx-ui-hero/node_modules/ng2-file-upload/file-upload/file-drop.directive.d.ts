import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader, FileUploaderOptions } from './file-uploader.class';
export declare class FileDropDirective {
    uploader: FileUploader;
    fileOver: EventEmitter<any>;
    onFileDrop: EventEmitter<File[]>;
    protected element: ElementRef;
    constructor(element: ElementRef);
    getOptions(): FileUploaderOptions;
    getFilters(): any;
    onDrop(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): any;
    protected _getTransfer(event: any): any;
    protected _preventAndStop(event: any): any;
    protected _haveFiles(types: any): any;
}
