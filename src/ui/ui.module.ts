import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],  
  declarations: [],
  exports: []
})
export class UiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiModule,
      providers: []
    };
  }
}
