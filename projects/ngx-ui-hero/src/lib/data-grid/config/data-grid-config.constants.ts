import { InjectionToken } from '@angular/core';
import { DataGridConfig } from './data-grid-config';

export let DATAGRID_CONFIG = new InjectionToken<DataGridConfig>('dataGridConfig');
