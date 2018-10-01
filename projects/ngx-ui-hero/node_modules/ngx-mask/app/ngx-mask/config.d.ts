import { InjectionToken } from '@angular/core';
export interface IConfig {
    sufix: string;
    prefix: string;
    clearIfNotMatch: boolean;
    showTemplate: boolean;
    showMaskTyped: boolean;
    dropSpecialCharacters: boolean | string[];
    specialCharacters: string[];
    patterns: {
        [character: string]: {
            pattern: RegExp;
            optional?: boolean;
        };
    };
}
export declare type optionsConfig = Partial<IConfig>;
export declare const config: InjectionToken<string>;
export declare const NEW_CONFIG: InjectionToken<string>;
export declare const INITIAL_CONFIG: InjectionToken<IConfig>;
export declare const initialConfig: IConfig;
