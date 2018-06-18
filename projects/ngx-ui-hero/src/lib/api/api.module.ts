import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ApiSettings } from './api.settings';
export { ApiSettings } from './api.settings';
import { API_SETTINGS } from './api.settings.constants';

import { ApiService } from './services/api/api.service';
export { ApiService } from './services/api/api.service';

import { AuthService } from './services/auth/auth.service';
export { AuthService } from './services/auth/auth.service';

import { LocalStorageService } from './services/storage/local-storage.service';
export { LocalStorageService } from './services/storage/local-storage.service';

import { ResponseHandlerService } from './services/api/response-handler.service';
export { ResponseHandlerService } from './services/api/response-handler.service';

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
        ApiService,
        AuthService,
        LocalStorageService,
        ResponseHandlerService,
        {
          provide: API_SETTINGS,
          useValue: settings
        }
      ]
    };
  }
}
