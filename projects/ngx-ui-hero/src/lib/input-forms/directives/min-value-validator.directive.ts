import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true}]
})
export class MinValueDirective implements Validator {
  @Input()
  min: number;
  
  validate(c: FormControl): {[key: string]: any} {
    if (this.min == undefined || this.min == null) return null;
    return c.value < this.min 
        ? {"invalid": true} 
        : null;
  }
}
