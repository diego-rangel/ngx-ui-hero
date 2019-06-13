import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-percent',
  templateUrl: './input-percent.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputPercentComponent, multi: true },
  ]
})
export class InputPercentComponent extends ElementBase<number> implements OnInit {
  @Input() showInputGroup?: boolean = true;
  @Input() inputGroupText?: string = '%';
  @Input() public placeholder = '';
  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-percent-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject(INPUT_FORMS_CONFIG) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit(): void {}
}
