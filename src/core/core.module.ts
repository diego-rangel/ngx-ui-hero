import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ResponseHandlerService } from './services/api/response-handler.service';

import { CoreSettings } from './core.settings';
import { CORE_SETTINGS } from './core.settings.constants';

// Export module's public API
export { ResponseHandlerService } from './services/api/response-handler.service';
export { CoreSettings } from './core.settings';

@NgModule({
  imports: [
    CommonModule
  ],  
  declarations: [],
  exports: []
})
export class CoreModule {
  static forRoot(settings: CoreSettings): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ResponseHandlerService,
        {
          provide: CORE_SETTINGS,
          useValue: settings
        }
      ]
    };
  }
}
