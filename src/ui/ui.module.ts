import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AlertService } from './services/alert.service';
export { AlertService } from './services/alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
})
export class UiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiModule,
      providers: [
        AlertService
      ]
    };
  }
}
