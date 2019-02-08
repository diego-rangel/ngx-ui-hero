import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { PrintingComponent } from './printing/printing.component';
import { ServicesComponent } from './services/services.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UiComponent } from './ui/ui.component';

const routes: Routes = [
  { path: '', redirectTo: 'get-started', pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'datagrid', component: DatagridComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'ui', component: UiComponent },
  { path: 'treeview', component: TreeviewComponent },
  { path: 'printing', component: PrintingComponent },
  { path: 'tutorial', component: TutorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
