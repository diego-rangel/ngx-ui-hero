import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertService } from './services/alert.service';

export * from './services/alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],  
  providers: [
    AlertService
  ],  
})
export class UiModule { }
