import { ElementRef } from '@angular/core';

import { TutorialAction } from './tutorial-action';

export class TutorialTask {
    action: TutorialAction;
    element: ElementRef;
}