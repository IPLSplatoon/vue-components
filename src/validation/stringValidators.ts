import { ValidatorResult } from './validator';
import { pluralize } from '../helpers/stringHelper';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';

export function minLength(length: number): (value?: string | null) => ValidatorResult {
    return (value?: string | null) => {
        return {
            isValid: isEmpty(value) || (value?.length ?? 0) >= length,
            message: `Must be at least ${pluralize('character', length)}`
        };
    };
}

export function maxLength(length: number): (value?: string | null) => ValidatorResult {
    return (value?: string | null) => {
        return {
            isValid: isEmpty(value) || length >= (value?.length ?? 0),
            message: `Must not be over ${pluralize('character', length)}`
        };
    };
}

export const numeric: (value?: string | null) => ValidatorResult = (value?: string | null) => ({
    isValid: isEmpty(value) || /^\d*$/.test(value ?? ''),
    message: 'Must be numeric'
});

export const notBlank: (value: string) => ValidatorResult = (value) => ({
    isValid: trim(value) !== '',
    message: 'Must not be blank'
});
