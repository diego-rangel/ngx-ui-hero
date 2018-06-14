import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputTextComponent } from './input-text.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputTextComponent', function () {
  let comp: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        InputTextComponent, 
        InputValidationsComponent
      ],
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
    fixture = TestBed.createComponent(InputTextComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => expect(comp).toBeDefined());
});
