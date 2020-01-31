import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TreeViewColumnModel } from '../models/tree-view-column.model';
import { TreeViewService } from '../tree-view.service';

@Component({
  selector: '[ui-tree-view-item]',
  templateUrl: './tree-view-item.component.html',
  styleUrls: ['tree-view-item.component.scss']
})
export class TreeViewItemComponent implements OnInit {
  @Input() row: any;
  @Input() idProperty: string;
  @Input() labelProperty: string;
  @Input() collectionProperty: string;
  @Input() columns: Array<TreeViewColumnModel>;
  @Input() showIcons: boolean = true;
  @Input() enableLabelLinkStyle: boolean = false;
  @Input() normalItemIconClass: string;
  @Input() collapsableClosedItemIconClass: string;
  @Input() collapsableOpennedItemIconClass: string;
  @Input() first: boolean;
  @Input() last: boolean;
  @Input() openned: boolean = false;
  @Input() expandedOnInit: boolean = false;
  @Input() rootItem: boolean = false;
  @Output() OnItemExpanded = new EventEmitter<any>();
  @Output() OnItemClicked = new EventEmitter<any>();

  active: boolean;
  summarizedStyle: boolean;
  equalHeightStyle: boolean;

  constructor(private service: TreeViewService) { }

  ngOnInit() {
    this.handleSelecionChanges();

    this.equalHeightStyle = this.columns != undefined && this.columns.length > 0;

    this.summarizedStyle = this.columns != undefined 
      && this.columns.length > 0 
      && this.row[this.collectionProperty] 
      && this.row[this.collectionProperty].length > 0;

    if (this.expandedOnInit) {
      this.openned = true;
    }
  }

  Toogle(): void {
    this.openned = !this.openned;
    
    if (this.openned) {
      this.emitItemExpandedEvent(this.row);
    }
  }
  OnClick(): void {
    this.emitItemClickedEvent(this.row);    
  }

  HandleSubItemExpanded(data: any): void {
    this.emitItemExpandedEvent(data);
  }
  HandleSubItemClicked(data: any): void {
    this.emitItemClickedEvent(data);
  }

  HandleColumnClick(column: TreeViewColumnModel, row: any, currentData: any, rowIndex: number): void {
    if (column.onClick) {
      column.onClick(row, currentData, rowIndex);
    }
  }

  private emitItemExpandedEvent(data: any): void {
      this.OnItemExpanded.emit(data);
  }
  private emitItemClickedEvent(data: any): void {
      this.OnItemClicked.emit(data);
  }
  private handleSelecionChanges(): void {
    this.service.onSelecionChanged.subscribe(data => {
      this.active = this.idProperty && this.row[this.idProperty] == data[this.idProperty];
    });
  }

}
