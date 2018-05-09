import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

let identifier = 0;

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextareaComponent,
    multi: true
  }]
})
export class InputTextareaComponent extends ElementBase<string> {
  @Input() public placeholder = '';
  @Input() public maxlength: number;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-textarea-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }
}
