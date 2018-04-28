import { InjectionToken } from '@angular/core';
import { CoreSettings } from './core.settings';

export let CORE_SETTINGS = new InjectionToken<CoreSettings>('coreSettings');