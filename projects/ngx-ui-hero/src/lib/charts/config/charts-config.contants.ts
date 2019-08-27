import { InjectionToken } from '@angular/core';

import { ChartsConfig } from './charts-config';

export let CHARTS_CONFIG = new InjectionToken<ChartsConfig>('chartsConfig');
