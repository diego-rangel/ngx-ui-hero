import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

let identifier = 0;

@Component({
  selector: 'input-percent',
  templateUrl: './input-percent.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputPercentComponent,
    multi: true
  }]
})
export class InputPercentComponent extends ElementBase<string> implements OnInit {
  @Input() showInputGroup?: boolean = true;
  @Input() inputGroupText?: string = '%';
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
