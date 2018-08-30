import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';

let identifier = 0;

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextComponent,
    multi: true
  }]
})
export class InputTextComponent extends ElementBase<string> implements OnInit {
  @Input() public placeholder = '';
  @Input() public maxlength: number;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-text-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit() {}
}
