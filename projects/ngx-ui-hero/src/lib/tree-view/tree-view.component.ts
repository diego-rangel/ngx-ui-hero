import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';

import { TreeViewConfig } from './config/tree-view-config';
import { TREEVIEW_CONFIG } from './config/tree-view-config.contants';
import { TreeViewColumnModel } from './models/tree-view-column.model';

@Component({
  selector: 'ui-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  @Input() columns: Array<TreeViewColumnModel>;
  @Input() data: Array<any>;
  @Input() idProperty: string;
  @Input() labelProperty: string;
  @Input() collectionProperty: string;
  @Input() emptyResultsMessage?: string = 'No results found at this moment.';
  @Input() showIcons?: boolean = true;
  @Input() enableLabelLinkStyle: boolean = false;
  @Input() normalItemIconClass?: string = 'fa fa-file';
  @Input() collapsableClosedItemIconClass?: string = 'fa fa-folder';
  @Input() collapsableOpennedItemIconClass?: string = 'fa fa-folder-open';
  @Input() expandAllOnInit?: boolean = true;
  @Output() OnItemExpanded = new EventEmitter<any>();
  @Output() OnItemClicked = new EventEmitter<any>();

  constructor(
    @Inject(TREEVIEW_CONFIG) @Optional() defaultOptions: TreeViewConfig,
  ) {
    Object.assign(this, defaultOptions);

    if (defaultOptions.styles) {
      Object.assign(this, defaultOptions.styles);
    }
  }

  ngOnInit() {
  }

}
