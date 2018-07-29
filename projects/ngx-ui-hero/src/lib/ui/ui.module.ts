import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './components/spinner.component';
export { SpinnerComponent } from './components/spinner.component';

import { AlertService } from './services/alert.service';

export * from './services/alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    AlertService
  ],  
})
export class UiModule { }
