import { Component, Input, ViewChild, Optional, Inject, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { InputDateConfig } from './input-date-config';
import { ElementBase } from '../../base/element-base';
import { INPUT_FORMS_CONFIG } from './../../input-forms-config.constants';
import { InputFormsConfig } from '../../input-forms-config';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';

let identifier = 0;

@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputDateComponent,
    multi: true
  }]
})
export class InputDateComponent extends ElementBase<Date> implements OnInit, DoCheck, InputDateConfig {
  @Input() placeholder = '';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format?: string = 'MM/dd/yyyy';
  @Input() showInputGroup?: boolean = true;
  @Input() inputGroupText?: string | SafeHtml;
  @Input() placement?: string = 'bottom';
  @Input() theme?: string = 'theme-dark-blue';
  @Output() onChange = new EventEmitter<Date>();
  @ViewChild('dp') datepicker: BsDatepickerDirective;
  @ViewChild(NgModel) model: NgModel;

  locale?: string = 'en-gb';
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: this.theme
  };

  public identifier = `input-date-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private localeService: BsLocaleService,
    private domSanitizer: DomSanitizer,
  ) {
    super(validators, asyncValidators, config);

    if (config.date) {
      Object.assign(this, config.date);
    }
  }

  ngOnInit() {
    this.localeService.use(this.locale);
    this.datepicker.setConfig();

    if (!this.inputGroupText) {
      this.inputGroupText = this.domSanitizer.bypassSecurityTrustHtml("<i class='fa fa-calendar' aria-hidden='true'></i>");
    }

    setTimeout(()=> {
      this.handleInitialValue();
    });
  }
  ngDoCheck(): void {
    this.handleInitialValue();
  }

  onValueChange(value: any): void {
    this.onChange.emit(value);  
  }

  private handleInitialValue(): void {
    if (this.value && (typeof this.value == "string" || this.value instanceof String)) {
      let data = new Date(this.value);
      data.setHours(0);
      data.setMinutes(0);
      data.setSeconds(0);
      data.setMilliseconds(0);
      this.writeValue(data);
    }
  }
}
