import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewItemComponent } from './tree-view-item.component';

describe('TreeViewItemComponent', () => {
  let component: TreeViewItemComponent;
  let fixture: ComponentFixture<TreeViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
