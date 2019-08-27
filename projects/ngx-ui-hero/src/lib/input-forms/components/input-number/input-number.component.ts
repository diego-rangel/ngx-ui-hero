import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputNumberComponent,
    multi: true
  }]
})
export class InputNumberComponent extends ElementBase<string> implements OnInit {
  @Input() public maxValue: number;
  @Input() public minValue: number;

  @ViewChild(NgModel, {static: true}) model: NgModel;

  public identifier = `input-number-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject(INPUT_FORMS_CONFIG) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit(): void {}
}
