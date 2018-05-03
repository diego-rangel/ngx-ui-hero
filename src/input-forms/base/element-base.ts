import { Input, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { INPUT_FORMS_CONFIG } from './../input-forms-config.constants';
import { InputFormsConfig } from './../input-forms-config';
import { ValueAccessorBase } from './value-accessor-base';

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validate';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  @Input() public label: string;
  @Input() public disabled: boolean;
  @Input() public showValidations = true;

  protected abstract model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  protected get invalid(): Observable<boolean> {
    return this.validate().map(v => this.invalidPattern || Object.keys(v || {}).length > 0);
  }

  protected get failures(): Observable<Array<string>> {
    return this.validate().map(v => {
      const fails = Object.keys(v || {}).map(k => message(v, k, this.label, this.config.validationMessages));

      if (this.invalidPattern) {
        fails.push(message(v, 'pattern', this.label, this.config.validationMessages));
      }

      return fails;
    });
  }

  protected get touched(): boolean {
    return this.model.touched;
  }

  protected get invalidPattern(): boolean {
    return this.model.control.hasError('pattern');
  }
}
