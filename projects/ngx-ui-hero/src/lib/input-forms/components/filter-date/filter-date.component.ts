import { BsDatepickerInlineConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Component, DoCheck, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ElementBase } from '../../base/element-base';
import { AsyncValidatorArray, ValidatorArray } from '../../base/validate';
import { InputFormsConfig } from '../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { InputDateConfig } from '../input-date/input-date-config';

let identifier = 0;

@Component({
  selector: 'filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FilterDateComponent,
    multi: true
  }]
})
export class FilterDateComponent extends ElementBase<Date> implements OnInit, DoCheck, InputDateConfig {
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format?: string = 'MM/dd/yyyy';
  @Input() theme?: string = 'theme-dark-blue';
  @Input() clearSelectionButtonLabel: string = 'Clear';
  @Output() onChange = new EventEmitter<Date>();
  @ViewChild(NgModel, {static: true}) model: NgModel;

  showDropdown: boolean;
  comboTouched: boolean;
  toggling: boolean;
  clickOutsideEnabled: boolean = true;
  locale?: string = 'en-gb';
  bsConfig: Partial<BsDatepickerInlineConfig> = {
    containerClass: this.theme,    
  };

  public identifier = `filter-date-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: ValidatorArray,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: AsyncValidatorArray,
    @Inject( INPUT_FORMS_CONFIG ) public config: InputFormsConfig,
    private localeService: BsLocaleService,
  ) {
    super(validators, asyncValidators, config);

    if (config.date) {
      Object.assign(this, config.date);
    }
    if (config.dropDown) {
      this.clearSelectionButtonLabel = config.dropDown.clearSelectionButtonLabel;
    }
  }

  ngOnInit() {
    this.localeService.use(this.locale);    

    setTimeout(()=> {
      this.handleInitialValue();
    });
  }
  ngDoCheck(): void {
    this.handleInitialValue();
  }

  onValueChange(value: any): void {
    if (this.toggling) return;

    this.value = value;
    this.onChange.emit(value);  

    setTimeout(() => {
      this.showDropdown = false;
    }, 0);
  }

  toggleDropDown(event: MouseEvent, value?: boolean): void {
    if (this.clickOutsideEnabled) {
      this.toggling = true;

      if ((value == false && !this.showDropdown) || (value == undefined && this.disabled)) return;
    
      if (value == undefined) {
        if (this.showDropdown) {
          this.setComboTouched();
        }
  
        this.showDropdown = !this.showDropdown;      
      } else {
        if (!value && this.showDropdown) {
          this.setComboTouched();
        }
        
        this.showDropdown = value;
      } 
      
      setTimeout(() => {
        this.toggling = false;
      }, 0);
    } else {
      this.clickOutsideEnabled = true;
    }
  }
  onComboPressed(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.toggleDropDown(null);
      event.preventDefault();
    }
  }

  clearSelection(e?: any): void {
    this.value = null;
    this.comboTouched = true;
    this.showDropdown = false;
    this.onChange.emit(this.value);

    if (e) e.stopPropagation();
  }

  private setComboTouched(): void {
    this.comboTouched = true;
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
