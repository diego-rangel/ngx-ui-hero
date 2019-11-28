import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

let identifier = 0;

@Component({
  selector: 'input-text-mask',
  templateUrl: './input-text-mask.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputTextMaskComponent,
    multi: true
  }]
})
export class InputTextMaskComponent extends ElementBase<string> implements OnInit {
  @Input() public placeholder = '';
  @Input() public masking: string;
  @Input() public includeLiterals: boolean = false;

  wasTouched: boolean = false;
 
  @ViewChild(NgModel, {static: true}) model: NgModel;
  
  public identifier = `input-text-mask-${identifier++}`;  
 
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit() {        
  }

  onTouch(): void {
    this.wasTouched = true;
  }
 
}
