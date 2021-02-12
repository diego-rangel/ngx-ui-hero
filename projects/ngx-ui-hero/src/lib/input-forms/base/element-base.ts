import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Input, Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

import { InputFormsConfig } from '../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../input-forms-config.constants';
import { AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray } from './validate';
import { ValueAccessorBase } from './value-accessor-base';

@Directive()
export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  @Input() public label: string;
  @Input() public disabled: boolean;
  @Input() public showValidations = false;
  @Input() public autocomplete: string = 'on';
  @Input() public help: string;
  @Input() public description: string;

  protected abstract model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super();
  }

  validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  get invalid(): Observable<boolean> {
    return this.validate().pipe(map((v: any) => this.invalidPattern || this.invalidMaxValue || this.invalidMinValue || Object.keys(v || {}).length > 0));
  }

  get failures(): Observable<Array<string>> {
    return this.validate().pipe(
      map((v: any) => {
        const fails = Object.keys(v || {}).map(k => message(v, k, this.label, this.config.validationMessages));
  
        if (this.invalidPattern || this.invalidMaxValue || this.invalidMinValue) {
          fails.push(message(v, 'pattern', this.label, this.config.validationMessages));
        }
  
        return fails;
      })
    );
  }

  get touched(): boolean {
    return this.model != null && this.model != undefined && (this.model.touched || this.internallyTouched);
  }

  get invalidPattern(): boolean {
    return this.model.control.hasError('pattern');
  }
  get invalidMaxValue(): boolean {
    return this.model.control.hasError('max');
  }
  get invalidMinValue(): boolean {
    return this.model.control.hasError('min');
  }
  get isRequired(): boolean {
    if (!this.validators || this.validators.length === 0) {
      return;
    }

    return this.validators.filter(x => x['required'] == true).length > 0;
  }
}
