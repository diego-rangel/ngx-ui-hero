import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingComponent } from './printing.component';

describe('PrintingComponent', () => {
  let component: PrintingComponent;
  let fixture: ComponentFixture<PrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
