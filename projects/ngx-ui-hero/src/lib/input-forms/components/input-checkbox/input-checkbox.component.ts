import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCheckboxComponent,
    multi: true
  }]
})
export class InputCheckboxComponent extends ElementBase<boolean> {
  @ViewChild(NgModel, {static: true}) model: NgModel;

  public identifier = `input-checkbox-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }
}
