import { InjectionToken } from '@angular/core';

import { TreeViewConfig } from './tree-view-config';

export let TREEVIEW_CONFIG = new InjectionToken<TreeViewConfig>('treeViewConfig');
