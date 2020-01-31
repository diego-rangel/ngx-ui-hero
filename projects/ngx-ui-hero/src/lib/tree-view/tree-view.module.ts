import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxUiHeroInputFormsModule } from '../input-forms/input-forms.module';
import { TreeViewConfig } from './config/tree-view-config';
import { TREEVIEW_CONFIG } from './config/tree-view-config.contants';
import { TreeViewItemComponent } from './tree-view-item/tree-view-item.component';
import { TreeViewComponent } from './tree-view.component';
import { TreeViewService } from './tree-view.service';

export { TreeViewService } from './tree-view.service';
export { TreeViewComponent } from './tree-view.component';
export { TreeViewConfig, TreeViewStylesConfig } from './config/tree-view-config';
export { TreeViewColumnModel, EnumTreeViewColumnDataType } from './models/tree-view-column.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxUiHeroInputFormsModule
    ],
    declarations: [
        TreeViewComponent,
        TreeViewItemComponent
    ],
    exports: [
        TreeViewComponent
    ],
    providers: [
        TreeViewService
    ],
})
export class NgxUiHeroTreeViewModule {
    static forRoot(config: TreeViewConfig): ModuleWithProviders {
        return {
            ngModule: NgxUiHeroTreeViewModule,
            providers: [
                {
                    provide: TREEVIEW_CONFIG,
                    useValue: config,
                }
            ]
        };
    }
}
