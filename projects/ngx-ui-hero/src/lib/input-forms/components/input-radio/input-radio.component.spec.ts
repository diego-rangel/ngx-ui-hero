import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRadioComponent } from './input-radio.component';
import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputRadiolistComponent', () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputRadioComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
