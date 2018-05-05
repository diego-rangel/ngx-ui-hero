import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';

@NgModule({
    imports: [RouterModule.forChild([
      { path: '', component: ComponentsComponent }
    ])],
    exports: [RouterModule]
  })
export class ComponentsRoutingModule {}