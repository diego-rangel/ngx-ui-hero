import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/storage/local-storage.service';

import { CoreSettings } from './core.settings';
import { CORE_SETTINGS } from './core.settings.constants';

// Export module's public API
export { AuthService } from './services/auth/auth.service';
export { LocalStorageService } from './services/storage/local-storage.service';
export { CoreSettings } from './core.settings';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
})
export class CoreModule {
  static forRoot(settings: CoreSettings): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        LocalStorageService,
        {
          provide: CORE_SETTINGS,
          useValue: settings
        }
      ]
    };
  }
}
