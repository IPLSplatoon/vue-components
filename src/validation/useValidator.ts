import { inject, InjectionKey, MaybeRefOrGetter, onUnmounted, toValue, watch } from 'vue';
import { FieldValidatorState, ValidatorResult } from './validator';

export const ValidatorInjectionKey = Symbol() as InjectionKey<{
    state: Record<string, FieldValidatorState<unknown>>,
    update: (name: string, isValid: boolean | null, message?: string | null) => void
}>;

export function useValidator<T>(
    name: MaybeRefOrGetter<string>,
    value: MaybeRefOrGetter<T>
): ValidatorResult {
    const validators = inject(ValidatorInjectionKey, undefined);
    const validator = validators?.state[toValue(name)];

    if (validator == null) {
        return {
            isValid: null,
            message: null
        };
    }

    watch(
        () => toValue(value),
        newValue => {
            for (let i = 0; i < validator.definition.validators.length; i++) {
                const validationResult = validator.definition.validators[i](newValue);
                if (!validationResult.isValid) {
                    validators?.update(toValue(name), false, validationResult.message);
                    return;
                }
            }

            validators?.update(toValue(name), true, null);
        },
        { immediate: validator.definition.immediate ?? false });

    onUnmounted(() => {
        validators?.update(toValue(name), null, null);
    });

    return validator.result;
}
