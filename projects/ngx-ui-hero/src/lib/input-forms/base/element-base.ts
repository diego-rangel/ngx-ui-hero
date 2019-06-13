import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

import { InputFormsConfig } from '../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../input-forms-config.constants';
import { AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray } from './validate';
import { ValueAccessorBase } from './value-accessor-base';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  @Input() public label: string;
  @Input() public disabled: boolean;
  @Input() public showValidations = false;
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
    return this.validate().pipe(map((v: any) => this.invalidPattern || Object.keys(v || {}).length > 0));
  }

  get failures(): Observable<Array<string>> {
    return this.validate().pipe(
      map((v: any) => {
        const fails = Object.keys(v || {}).map(k => message(v, k, this.label, this.config.validationMessages));
  
        if (this.invalidPattern) {
          fails.push(message(v, 'pattern', this.label, this.config.validationMessages));
        }
  
        return fails;
      })
    );
  }

  get touched(): boolean {
    return this.model != null && this.model != undefined && this.model.touched;
  }

  get invalidPattern(): boolean {
    return this.model.control.hasError('pattern');
  }

  public get isRequired(): boolean {
    if (!this.validators || this.validators.length === 0) {
      return;
    }

    for (let i = 0; i < this.validators.length; i++) {
      const props = Object.keys(this.validators[i] || {});

      for (let p = 0; p < props.length; p++) {
        if (props[p] === '_required') {
          return true;
        }
      }
    }

    return false;
  }
}
