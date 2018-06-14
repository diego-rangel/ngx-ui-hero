export interface InputFormsConfig {
    currency: InputFormsCurrencyConfig;
    validationMessages: InputFormsValidationConfig;
}

export interface InputFormsCurrencyConfig {
    currencyCode: string;
    align: string;
    allowNegative: boolean;
    allowZero: boolean;
    decimal: string;
    thousands: string;
    precision: number;
    prefix: string;
    suffix: string;
}

export interface InputFormsValidationConfig {
    required: string;
    pattern: string;
    minlength: string;
    maxlength: string;
    invalid: string;
}
