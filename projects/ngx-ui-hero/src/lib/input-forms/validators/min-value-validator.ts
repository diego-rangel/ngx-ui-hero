import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[min][ngModel]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: MinValueValidator, multi: true }
    ]
})
export class MinValueValidator {
    @Input() min: number;

    validate(control: AbstractControl): {[validator: string]: any} {
        if (this.min == undefined) return null;

        if (control.value < this.min) {
            return {
                min: true
            };
        }
        
        return null;
    }
}
