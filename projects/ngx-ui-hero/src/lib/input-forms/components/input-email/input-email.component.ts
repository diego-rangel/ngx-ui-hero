import { Component, Input, ViewChild, Optional, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';

let identifier = 0;

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS
} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-email',
  templateUrl: './input-email.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputEmailComponent,
    multi: true
  }]
})
export class InputEmailComponent extends ElementBase<string> implements OnInit {
  @Input() public placeholder = '';
  @Input() public maxlength: number;
  @Input() showInputGroup?: boolean = true;
  @Input() inputGroupText?: string | SafeHtml;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `input-email-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private domSanitizer: DomSanitizer
  ) {
    super(validators, asyncValidators, config);
  }

  ngOnInit() {    
    if (!this.inputGroupText) {
      this.inputGroupText = this.domSanitizer.bypassSecurityTrustHtml("<i class='fa fa-envelope-o' aria-hidden='true'></i>");
    }
  }
}
