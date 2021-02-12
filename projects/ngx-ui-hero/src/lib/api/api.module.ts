import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ApiSettings } from './api.settings';
import { API_SETTINGS } from './api.settings.constants';
import { LocalStorageService } from './services/storage/local-storage.service';

export { ApiSettings } from './api.settings';
export { BaseApiUrlInterceptor } from './interceptors/base-api-url.interceptor';
export { CommonHeadersInterceptor } from './interceptors/common-headers.interceptor';
export { JwtAuthInterceptor } from './interceptors/jwt-auth.interceptor';
export { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
export { ResponseDataInterceptor } from './interceptors/response-data.interceptor';
export { WinAuthInterceptor } from './interceptors/win-auth.interceptor';
export { LocalStorageService } from './services/storage/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
})
export class NgxUiHeroApiModule {
  static forRoot(settings: ApiSettings): ModuleWithProviders<NgxUiHeroApiModule> {
    return {
      ngModule: NgxUiHeroApiModule,
      providers: [
        LocalStorageService,
        {
          provide: API_SETTINGS,
          useValue: settings
        }
      ]
    };
  }
}
