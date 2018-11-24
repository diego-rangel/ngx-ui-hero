import { Component, ViewChild, Optional, Inject } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

let identifier = 0;

@Component({
  selector: 'input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputSwitchComponent,
    multi: true
  }]
})
export class InputSwitchComponent extends ElementBase<boolean> {
  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-switch-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  Toggle(): void {
    this.value = !this.value;
  }
}
