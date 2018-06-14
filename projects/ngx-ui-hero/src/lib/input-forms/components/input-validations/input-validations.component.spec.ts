import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidationsComponent } from './input-validations.component';

describe('InputValidationsComponent', () => {
  let component: InputValidationsComponent;
  let fixture: ComponentFixture<InputValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
