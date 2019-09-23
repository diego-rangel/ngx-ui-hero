import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[max][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true}]
})
export class MaxValueDirective implements Validator {
  @Input()
  max: number;
  
  validate(c: FormControl): {[key: string]: any} {
    if (this.max == undefined || this.max == null) return null;
    return c.value > this.max 
        ? {"invalid": true} 
        : null;
  }
}
