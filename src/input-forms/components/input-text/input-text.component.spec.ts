import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', function () {
  let de: DebugElement;
  let comp: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('p.description'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <p> text', () => {
    fixture.detectChanges();
    const p = de.nativeElement;
    const description = 'Angular library built with ❤ using ngx-library yeoman generator.';
    expect(p.textContent).toEqual(description);
  });
});
