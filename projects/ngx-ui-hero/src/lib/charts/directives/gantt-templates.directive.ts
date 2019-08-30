import { Directive, TemplateRef } from '@angular/core';

@Directive({selector: '[serie-tooltip-template]'})
export class GanttSeriesTooltipTemplateDirective {
    constructor(public template: TemplateRef<any>) {
    }
}
