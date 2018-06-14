import { InjectionToken } from '@angular/core';
import { ApiSettings } from './api.settings';

export let API_SETTINGS = new InjectionToken<ApiSettings>('apiSettings');
