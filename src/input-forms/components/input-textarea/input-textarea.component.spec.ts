import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextareaComponent } from './input-textarea.component';
import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputTextareaComponent', () => {
  let component: InputTextareaComponent;
  let fixture: ComponentFixture<InputTextareaComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputTextareaComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
