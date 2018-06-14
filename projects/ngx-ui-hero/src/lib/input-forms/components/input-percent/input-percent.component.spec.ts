import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputPercentComponent } from './input-percent.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputPercentComponent', () => {
  let component: InputPercentComponent;
  let fixture: ComponentFixture<InputPercentComponent>;

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
      declarations: [ InputPercentComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
