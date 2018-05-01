import { Injectable, Inject } from '@angular/core';
import { CORE_SETTINGS } from '../../core.settings.constants';
import { CoreSettings } from '../../core.settings';

declare var localStorage: any;

@Injectable()
export class LocalStorageService {
    private _prefix = 'uiHero_';

    constructor(
        @Inject(CORE_SETTINGS) public settings: CoreSettings,
    ) {
        if (this.settings.apiSettings.localStoragePrefix) {
            this._prefix = this.settings.apiSettings.localStoragePrefix
        }
    }

    Get(key: string): any {
        const result = localStorage.getItem(`${this._prefix}${key}`);

        if (typeof result === 'string') {
            return result;
        } else {
            return JSON.parse(result);
        }
    }
    Set(key: string, value: any): void {
        if (typeof value === 'string') {
            localStorage.setItem(`${this._prefix}${key}`, value);
        } else {
            localStorage.setItem(`${this._prefix}${key}`, JSON.stringify(value));
        }
    }
    Remove(key: string): void {
        localStorage.removeItem(`${this._prefix}${key}`);
    }
}
