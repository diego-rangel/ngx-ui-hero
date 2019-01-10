import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[auto-focus]' })
export class AutoFocusDirective implements OnInit {
    constructor(
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.el.nativeElement.focus();
    }
}