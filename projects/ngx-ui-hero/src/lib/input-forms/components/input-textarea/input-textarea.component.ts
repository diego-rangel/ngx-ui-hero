import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextareaComponent,
    multi: true
  }]
})
export class InputTextareaComponent extends ElementBase<string> implements OnInit {
  @Input() public placeholder = '';
  @Input() public maxlength: number;

  @ViewChild(NgModel, {static: true}) model: NgModel;

  public identifier = `input-textarea-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit(): void {}
}
