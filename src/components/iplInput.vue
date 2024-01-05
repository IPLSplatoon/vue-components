<template>
    <div
        class="ipl-input__wrapper"
        :class="{ [`theme-${theme}`]: true, 'disabled': disabled }"
    >
        <div
            class="ipl-input__input-and-extras"
            :class="{ 'has-error': validator?.isValid === false, 'is-color': type === 'color' }"
        >
            <div class="ipl-input__input-wrapper">
                <ipl-label :class="{ 'has-error': validator?.isValid === false }">
                    {{ label }}
                    <input
                        ref="input"
                        v-model="model"
                        :name="name"
                        :type="type"
                        :class="{ centered: centered }"
                        :disabled="disabled"
                        :placeholder="placeholder"
                        @focus="handleFocusEvent"
                        @blur="handleFocusEvent"
                        @input="handleFocusEvent($event), handleInputEvent()"
                    >
                </ipl-label>
            </div>
            <div
                v-if="!isBlank(extra) || loading"
                class="extra"
                @mousedown.prevent="focus"
            >
                <span class="extra-text">{{ extra }}</span>

                <ipl-spinner
                    v-if="loading"
                    :size="theme === 'large' ? '3px' : '2px'"
                    :width="theme === 'large' ? '28px' : '24px'"
                    :color="disabled ? 'var(--ipl-disabled-body-text-color)' : 'var(--ipl-body-text-color)'"
                    data-test="loading-spinner"
                />
            </div>
        </div>
        <span
            v-if="validator?.isValid === false"
            class="error"
        >
            {{ validator?.message }}
        </span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import IplLabel from './iplLabel.vue';
import IplSpinner from './iplSpinner.vue';
import { useValidator } from '../validation/useValidator';
import { isBlank } from '../helpers/stringHelper';

export default defineComponent({
    name: 'IplInput',

    components: { IplSpinner, IplLabel },

    props: {
        label: {
            type: String,
            default: null
        },
        placeholder: {
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
        },
        theme: {
            type: String as PropType<'large' | 'default'>,
            default: 'default'
        }
    },

    emits: [ 'update:modelValue', 'focuschange', 'input' ],

    setup(props, { emit }) {
        const input: Ref<HTMLInputElement | null> = ref(null);
        const validator = useValidator(() => props.name, () => props.modelValue);

        return {
            model: computed({
                get() {
                    return props.modelValue?.toString() ?? '';
                },
                set(value: string) {
                    emit('update:modelValue', props.formatter ? props.formatter(value) : value);
                }
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
            input,
            isBlank
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-input__wrapper.theme-large {
    &.disabled {
        .ipl-input__input-and-extras {
            background-color: var(--ipl-input-color-alpha-disabled);
        }
    }

    .ipl-input__input-and-extras {
        background-color: var(--ipl-input-color-alpha);
        border-radius: constants.$border-radius-inner constants.$border-radius-inner 0 0;

        &:not(.disabled):focus-within {
            background-color: var(--ipl-input-color-alpha-hover);
        }
    }

    .extra {
        padding: 0 12px 8px 0;

        .extra-text:not(:empty, :last-child) {
            margin-right: 4px;
        }
    }

    label {
        display: block;
        padding: 8px 12px;
    }

    input {
        font-size: 1.75em;
    }
}

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

        &::placeholder {
            opacity: 75%;
        }
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
        }
    }

    &[type='color'] {
        background-color: var(--ipl-bg-secondary);
        padding: 5px;
        border-radius: constants.$border-radius-inner;
        transition-property: background-color;
        transition-duration: constants.$transition-duration-low;
        height: 32px;

        &:disabled {
            background-color: var(--ipl-bg-tertiary);
        }

        &:not(:disabled) {
            &:hover {
                background-color: var(--ipl-bg-secondary-hover);
            }

            &:active {
                background-color: var(--ipl-bg-secondary-active);
            }
        }

        &:focus-visible {
            outline: 2px solid var(--ipl-focus-outline-color);
        }

        &::-moz-color-swatch {
            border-width: 0;
            border-radius: 2px;
        }

        &::-webkit-color-swatch {
            border-width: 0;
            border-radius: 2px;
        }

        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }
    }

    &::placeholder {
        color: var(--ipl-input-color-placeholder);
        opacity: 100%;
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
