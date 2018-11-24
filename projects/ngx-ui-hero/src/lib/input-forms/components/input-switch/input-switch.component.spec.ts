import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSwitchComponent } from './input-switch.component';
import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputSwitchComponent', () => {
  let component: InputSwitchComponent;
  let fixture: ComponentFixture<InputSwitchComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;
    
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputSwitchComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
