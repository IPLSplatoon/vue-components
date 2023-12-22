<template>
    <div class="ipl-input__wrapper">
        <div
            class="ipl-input__input-and-extras"
            :class="{ 'has-error': !isValid, 'is-color': type === 'color' }"
        >
            <div class="ipl-input__input-wrapper">
                <ipl-label :class="{ 'has-error': !isValid }">
                    {{ label }}
                    <input
                        ref="input"
                        v-model="model"
                        :name="name"
                        :type="type"
                        :class="{ centered: centered }"
                        :disabled="disabled"
                        @focus="handleFocusEvent"
                        @blur="handleFocusEvent"
                        @input="handleFocusEvent($event), handleInputEvent()"
                    >
                </ipl-label>
            </div>
            <div
                class="extra"
                @mousedown.prevent="focus"
            >
                {{ extra }}

                <ipl-spinner
                    v-if="loading"
                    size="2px"
                    width="24px"
                    :color="disabled ? 'var(--ipl-disabled-body-text-color)' : 'var(--ipl-body-text-color)'"
                    data-test="loading-spinner"
                />
            </div>
        </div>
        <span
            v-if="!!validator"
            v-show="!isValid"
            class="error"
        >
            {{ validator.message }}
        </span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref, ref } from 'vue';
import { ValidatorResult } from '../validation/validator';
import IplLabel from './iplLabel.vue';
import IplSpinner from './iplSpinner.vue';

export default defineComponent({
    name: 'IplInput',

    components: { IplSpinner, IplLabel },

    props: {
        label: {
            type: String,
            default: null
        },
        modelValue: {
            type: [String, Number, null] as PropType<string | number | null>,
            default: ''
        },
        type: {
            type: String as PropType<'text' | 'number' | 'color' | 'email' | 'password' | 'url' | 'search'>,
            default: 'text',
            validator: (value: string) => {
                return ['text', 'number', 'color', 'email', 'password', 'url', 'search'].includes(value);
            }
        },
        name: {
            type: String,
            required: true
        },
        centered: {
            type: Boolean,
            default: false
        },
        formatter: {
            type: Function as PropType<(value: string) => string>,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        extra: {
            type: String,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

    emits: [ 'update:modelValue', 'focuschange', 'input' ],

    setup(props, { emit }) {
        const input: Ref<HTMLInputElement | null> = ref(null);
        const validators = inject<Record<string, ValidatorResult> | null>('validators', null);
        const validator = computed(() => validators?.[props.name]);

        return {
            model: computed({
                get() {
                    return props.modelValue?.toString() ?? '';
                },
                set(value: string) {
                    emit('update:modelValue', props.formatter ? props.formatter(value) : value);
                }
            }),
            isValid: computed(() => {
                return !validator.value ? true : validator.value?.isValid ?? true;
            }),
            validator,
            handleFocusEvent(e: Event) {
                if (e.type === 'blur') {
                    if (input.value) {
                        input.value.value = props.modelValue?.toString() ?? '';
                    }
                }
                emit('focuschange', e.type !== 'blur');
            },
            handleInputEvent() {
                emit('input');
            },
            focus() {
                if (input.value) {
                    input.value.focus();
                }
            },
            input
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-input__input-and-extras {
    border-bottom: 1px solid var(--ipl-input-color);
    transition-duration: constants.$transition-duration-low;
    width: 100%;
    display: flex;
    flex-direction: row;

    > .ipl-input__input-wrapper {
        flex-grow: 1;
    }

    &:focus-within {
        border-color: var(--ipl-input-color-active);

        label {
            color: var(--ipl-input-color-active);
        }
    }

    &.has-error {
        border-color: var(--ipl-input-error-color);
    }

    &.is-color {
        border-bottom: unset !important;
    }
}

label.has-error {
    color: var(--ipl-input-error-color) !important;
}

input {
    background-color: transparent;
    border: 0;
    width: 100%;
    color: var(--ipl-body-text-color);
    font-size: 1.4em;
    font-family: constants.$body-font;
    display: block;
    box-sizing: border-box;
    margin: 2px 0;
    padding: 0;

    &:disabled {
        color: var(--ipl-disabled-body-text-color);
    }

    &:focus {
        outline: none;
    }

    &[type='number'] {
        -moz-appearance: textfield;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type='search'] {
        &::-webkit-search-cancel-button {
            -webkit-appearance: none;
            // x-mark from font-awesome: https://fontawesome.com/icons/xmark?s=solid
            background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M310.6%20361.4c12.5%2012.5%2012.5%2032.75%200%2045.25C304.4%20412.9%20296.2%20416%20288%20416s-16.38-3.125-22.62-9.375L160%20301.3L54.63%20406.6C48.38%20412.9%2040.19%20416%2032%20416S15.63%20412.9%209.375%20406.6c-12.5-12.5-12.5-32.75%200-45.25l105.4-105.4L9.375%20150.6c-12.5-12.5-12.5-32.75%200-45.25s32.75-12.5%2045.25%200L160%20210.8l105.4-105.4c12.5-12.5%2032.75-12.5%2045.25%200s12.5%2032.75%200%2045.25l-105.4%20105.4L310.6%20361.4z%22%2F%3E%3C%2Fsvg%3E');
            background-size: 12px;
            width: 16px;
            height: 16px;
            background-position: center;
            background-repeat: no-repeat;
            transition-duration: constants.$transition-duration-low;
            cursor: pointer;
            opacity: 0;

            &:hover {
                opacity: 0.5 !important;
            }

            &:active {
                opacity: 0.9 !important;
            }
        }

        &:hover::-webkit-search-cancel-button {
            opacity: 0.3;
        }
    }

    &[type='color'] {
        background-color: var(--ipl-bg-secondary);
        padding: 5px;
        height: 36px;
        border-radius: constants.$border-radius-inner;

        &:disabled {
            background-color: var(--ipl-bg-tertiary);
        }
    }

    &.centered {
        text-align: center;
    }
}

.error {
    color: var(--ipl-input-error-color);
    font-size: 0.75em;
}

.extra {
    display: flex;
    align-items: flex-end;
    padding-bottom: 2px;
    padding-left: 4px;
    user-select: none;
    cursor: text;
}
</style>
