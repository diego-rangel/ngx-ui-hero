import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[actions-column]'})
export class ActionsColumnDirective {
    constructor(public template: TemplateRef<any>) {
    }
}
