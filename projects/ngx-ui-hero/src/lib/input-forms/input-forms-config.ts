import { InputDateConfig } from './components/input-date/input-date-config';

export interface InputFormsConfig {
    currency?: InputFormsCurrencyConfig;
    validationMessages?: InputFormsValidationConfig;
    date?: InputDateConfig;
    upload?: InputFormsUploadConfig;
    multiSelect?: MultiSelectConfig;
}

export interface InputFormsCurrencyConfig {
    currencyCode?: string;
    align?: string;
    allowNegative?: boolean;
    allowZero?: boolean;
    decimal?: string;
    thousands?: string;
    precision?: number;
    prefix?: string;
    suffix?: string;
}

export interface InputFormsValidationConfig {
    required?: string;
    pattern?: string;
    minlength?: string;
    maxlength?: string;
    invalid?: string;
}

export interface InputFormsUploadConfig {
    placeholder?: string;
    dropZonePlaceholder?: string;
    autoUpload?: boolean;
    showDropZone?: boolean;
    showQueue?: boolean;
    withCredentials?: boolean;
    chunk?: boolean;
    chunkSize?: number;
    chunkRetries?: number;
    chunkRequestsCountInParallel?: number;
    maxFileSize?: number;
    selectButtonIcon?: string;
    selectButtonLabel?: string;
    removeButtonIcon?: string;
    removeButtonLabel?: string;
    fileTypeErrorMessage?: string;
    fileSizeErrorMessage?: string;
    maxFileSizeLabel?: string;
    allowedExtensionsLabel?: string;
}

export interface MultiSelectConfig {
    placeholder?: string;
    searchPlaceholder?: string;
    displayTextProperty?: string;
    valueProperty?: string;
    emptyMessage?: string;
    selectAllButtonLabel?: string;
    clearSelectionButtonLabel?: string;
    maxCountOfLabelsToShow?: number;
}
