import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextMaskComponent } from './input-text-mask.component';

describe('InputTextMaskComponent', () => {
  let component: InputTextMaskComponent;
  let fixture: ComponentFixture<InputTextMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
