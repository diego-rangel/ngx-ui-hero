import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEmailComponent } from './input-email.component';
import { InputValidationsComponent } from './../input-validations/input-validations.component';
import { InputFormsConfig } from './../../input-forms-config';
import { INPUT_FORMS_CONFIG } from '../../input-forms-config.constants';

describe('InputEmailComponent', () => {
  let component: InputEmailComponent;
  let fixture: ComponentFixture<InputEmailComponent>;

  beforeEach(async(() => {
    let inputFormsConfig: InputFormsConfig = null;

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ InputEmailComponent, InputValidationsComponent ],
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
    fixture = TestBed.createComponent(InputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
