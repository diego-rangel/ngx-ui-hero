import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[max][ngModel]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: MaxValueValidator, multi: true }
    ]
})
export class MaxValueValidator {
    @Input() max: number;

    validate(control: AbstractControl): {[validator: string]: any} {
        if (this.max == undefined) return null;

        if (control.value > this.max) {
            return {
                min: true
            };
        }
        
        return null;
    }
}
