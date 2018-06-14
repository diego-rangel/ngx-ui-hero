import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCheckboxComponent } from './input-checkbox.component';
import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputCheckboxComponent', () => {
  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;
    
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputCheckboxComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
