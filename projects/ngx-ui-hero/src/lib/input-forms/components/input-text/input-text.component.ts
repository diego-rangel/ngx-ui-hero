import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

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
  @Input() public mask: string;
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
