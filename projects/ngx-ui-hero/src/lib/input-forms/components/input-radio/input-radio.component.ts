import { Component, Input, ViewChild, Optional, Inject } from '@angular/core';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

let identifier = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-radio',
  templateUrl: './input-radio.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputRadioComponent,
    multi: true
  }]
})
export class InputRadioComponent extends ElementBase<string> {
  @Input() public name: string;
  @Input() public radioValue: string;
  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-radio-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  OnValueChanged(): void {}
}
