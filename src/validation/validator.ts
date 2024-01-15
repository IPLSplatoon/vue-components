import { computed, ComputedRef, provide, reactive } from 'vue';
import { ValidatorInjectionKey } from './useValidator';

export interface ValidatorResult {
    isValid: boolean | null
    message?: string | null
}

export interface FieldValidatorDefinition<T> {
    immediate: boolean
    validators: ValidatorFunction<T>[]
}

export interface FieldValidatorState<T> {
    definition: FieldValidatorDefinition<T>
    result: ValidatorResult
}

export type ValidatorFunction<T> = ((value: T) => ValidatorResult)

export function validator<T>(
    immediate: boolean,
    ...validators: ValidatorFunction<T>[]
): FieldValidatorDefinition<T> {
    return {
        immediate,
        validators
    };
}

export function provideValidators(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: Record<string, FieldValidatorDefinition<any>>
): { allValid: ComputedRef<boolean>, fieldIsValid: (name: string) => boolean } {
    const state = Object.entries(validators)
        .reduce((result: Record<string, FieldValidatorState<unknown>>, [name, definition]) => {
            result[name] = {
                definition,
                result: reactive({
                    isValid: null,
                    message: null
                })
            };
            return result;
        }, { });

    provide(ValidatorInjectionKey, {
        state,
        update(name, isValid, message) {
            if (state[name]) {
                state[name].result.isValid = isValid;
                state[name].result.message = message;
            }
        }
    });

    return {
        allValid: computed(() => Object.values(state).every(status => status.result.isValid)),
        fieldIsValid: name => state[name]?.result.isValid === true
    };
}
