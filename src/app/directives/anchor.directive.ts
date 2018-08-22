import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

declare var $: any;

@Directive({ selector: 'a[anchorLink]' })
export class AnchorLinkDirective implements OnInit {
    @Input() anchorLink: string;

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit(): void {
        this.render.listen(this.el.nativeElement, 'click', (event) => {
            $('body').scrollTo(`#${this.anchorLink}`, 800, {
                offset: -20
            });

            return false;
        });
    }
}