import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetStartedComponent } from './get-started/get-started.component';
import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', redirectTo: 'get-started', pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'services', component: ServicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
