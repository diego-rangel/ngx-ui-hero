import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { TutorialAction } from '../classes/tutorial-action';
import { TutorialService } from '../services/tutorial.service';

@Directive({ selector: '[tutorial]' })
export class TutorialDirective implements OnInit {
    @Input() tutorial: TutorialAction;

    constructor(
        private tutorialService: TutorialService,
        private el: ElementRef,
    ) { }
    
    ngOnInit(): void {
        this.tutorialService.addAction(this.tutorial, this.el);
    }
}