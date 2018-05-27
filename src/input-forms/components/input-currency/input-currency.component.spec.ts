import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputCurrencyComponent } from './input-currency.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputCurrencyComponent', () => {
  let component: InputCurrencyComponent;
  let fixture: ComponentFixture<InputCurrencyComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputCurrencyComponent, InputValidationsComponent ],
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
