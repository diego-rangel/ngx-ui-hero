import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
    AbstractControl,
    AsyncValidatorFn,
    Validator,
    Validators,
    ValidatorFn,
} from '@angular/forms';

// tslint:disable-next-line:interface-over-type-literal
export type ValidationResult = {[validator: string]: string | boolean};
export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;
export type ValidatorArray = Array<Validator | ValidatorFn>;

const normalizeValidator = (validator: Validator | ValidatorFn): ValidatorFn | AsyncValidatorFn => {
    const func = (validator as Validator).validate.bind(validator);
    if (typeof func === 'function') {
        return (c: AbstractControl) => func(c);
    } else {
        return <ValidatorFn | AsyncValidatorFn> validator;
    }
};

export const composeValidators = (validators: ValidatorArray): AsyncValidatorFn | ValidatorFn => {
    if (validators == null || validators.length === 0) {
        return null;
    }
    return Validators.compose(validators.map(normalizeValidator));
};

export const validate = (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
    return (control: AbstractControl) => {
        const synchronousValid = () => composeValidators(validators)(control);

        if (asyncValidators) {
        const asyncValidator = composeValidators(asyncValidators);

        return asyncValidator(control).map((v: any) => {
            const secondary = synchronousValid();
            if (secondary || v) { // compose async and sync validator results
            return Object.assign({}, secondary, v);
            }
        });
        }

        if (validators) {
        return Observable.of(synchronousValid());
        }

        return Observable.of(null);
    };
};

export const handleValidationError = (errorMessage: string, label: string): string => {
    const re = /{label}/gi;
    return errorMessage.replace(re, label);
};

export const message = (validator: ValidationResult, key: string, label: string, validationMessages: any): string => {
    switch (key) {
        case 'required':
            return handleValidationError(validationMessages.required, label);
        case 'pattern':
            return handleValidationError(validationMessages.pattern, label);
        case 'minlength':
            return handleValidationError(validationMessages.minlength, label);
        case 'maxlength':
            return handleValidationError(validationMessages.maxlength, label);
    }

    switch (typeof validator[key]) {
        case 'string':
            return <string> validator[key];
        default:
            return handleValidationError(validationMessages.invalid, label);
    }
};
