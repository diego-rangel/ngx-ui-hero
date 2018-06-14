import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputCurrencyComponent } from './input-currency.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';
import { CurrencySymbolPipe } from '../../base/currency-symbol.pipe';

describe('InputCurrencyComponent', () => {
  let component: InputCurrencyComponent;
  let fixture: ComponentFixture<InputCurrencyComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = {
      currency: {
        currencyCode: 'USD',
        align: 'right',
        allowNegative: true,
        allowZero: true,
        decimal: '.',
        thousands: ',',
        precision: 2,
        prefix: '',
        suffix: ''
      },
      validationMessages: {
        invalid: '{label} is invalid',
        required: '{label} is required',
        pattern: '{label} is invalid',
        maxlength: 'The filled-in value is greater than the maximum allowed',
        minlength: 'The filled-in value is less than the minimum allowed'
      }
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputCurrencyComponent, InputValidationsComponent, CurrencySymbolPipe ],
      providers: [
        {
          provide: INPUT_FORMS_CONFIG,
          useValue: inputFormsConfig
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
