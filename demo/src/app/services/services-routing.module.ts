import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServicesComponent } from './services.component';

@NgModule({
    imports: [RouterModule.forChild([
      { path: '', component: ServicesComponent }
    ])],
    exports: [RouterModule]
  })
export class ServicesRoutingModule {}