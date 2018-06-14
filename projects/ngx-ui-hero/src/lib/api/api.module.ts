import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/storage/local-storage.service';

import { ApiSettings } from './api.settings';
import { API_SETTINGS } from './api.settings.constants';

// Export module's public API
export { AuthService } from './services/auth/auth.service';
export { LocalStorageService } from './services/storage/local-storage.service';
export { ApiSettings } from './api.settings';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
})
export class NgxUiHeroApiModule {
  static forRoot(settings: ApiSettings): ModuleWithProviders {
    return {
      ngModule: NgxUiHeroApiModule,
      providers: [
        AuthService,
        LocalStorageService,
        {
          provide: API_SETTINGS,
          useValue: settings
        }
      ]
    };
  }
}
