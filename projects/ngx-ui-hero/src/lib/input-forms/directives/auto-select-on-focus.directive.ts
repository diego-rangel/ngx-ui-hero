import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

declare var jQuery: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input[autoSelectOnFocus]'
})
export class AutoSelectOnFocusDirective implements OnInit {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.renderer.listen(this.elementRef.nativeElement, 'focus', (event: any) => {
            jQuery(this.elementRef.nativeElement).select();
        });
    }
}
