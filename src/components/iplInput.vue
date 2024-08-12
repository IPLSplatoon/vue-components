<template>
    <ipl-label
        class="ipl-input__wrapper"
        :class="{
            [`theme-${theme}`]: true,
            'disabled': disabled,
            'has-error': validator?.isValid === false,
            'has-label': !isBlank(label)
        }"
    >
        {{ label }}
        <div
            class="ipl-input__input-and-extras"
            :class="{ 'is-color': type === 'color' }"
        >
            <div
                v-if="!isBlank(prefix)"
                class="extra prefix"
                @mousedown.prevent="focus"
            >
                <span class="extra-text">{{ prefix }}</span>
            </div>
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
            <div
                v-if="!isBlank(extra) || loading"
                class="extra suffix"
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
    </ipl-label>
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
        prefix: {
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
            blur() {
                input.value?.blur();
            },
            input,
            isBlank
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';


.ipl-input__wrapper {
    display: block;
    margin-top: 3px;

    &.has-error {
        color: var(--ipl-input-error-color) !important;

        .ipl-input__input-and-extras {
            border-color: var(--ipl-input-error-color);
        }
    }

    &:focus-within {
        color: var(--ipl-input-color-focus);
    }

    &.theme-large {
        margin-top: 0;

        &.disabled {
            .ipl-input__input-and-extras {
                background-color: var(--ipl-input-color-alpha-disabled);
            }
        }

        &.has-label .ipl-input__input-and-extras {
            margin-top: 2px;
        }

        .ipl-input__input-and-extras {
            padding: 8px 12px;
            background-color: var(--ipl-input-color-alpha);
            border-radius: constants.$border-radius-inner constants.$border-radius-inner 0 0;

            &:not(.disabled):focus-within {
                background-color: var(--ipl-input-color-alpha-focus);
            }
        }

        .extra {
            padding: 0 0 2px 0;
            font-size: 1.75em;

            &.suffix {
                .extra-text:not(:empty, :last-child) {
                    margin-right: 4px;
                }
            }

            .extra-text {
                padding-bottom: 0;
            }
        }

        input {
            font-size: 1.75em;
        }
    }
}

.ipl-input__input-and-extras {
    border-bottom: 1px solid var(--ipl-input-color);
    transition-duration: constants.$transition-duration-low;
    width: 100%;
    display: flex;
    flex-direction: row;

    > input {
        flex-grow: 1;
    }

    &:focus-within {
        border-color: var(--ipl-input-color-focus);
    }

    &.is-color {
        border-bottom: unset !important;
    }
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
            outline: var(--ipl-focus-outline-width) solid var(--ipl-focus-outline-color);
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
    font-size: 1em;
    display: inline-block;
    margin-top: 2px;
}

.extra {
    display: flex;
    align-items: flex-end;
    user-select: none;
    cursor: text;
    font-size: 1.4em;
    color: var(--ipl-body-text-color);
    white-space: pre;

    &.suffix {
        padding-left: 4px;
    }

    .extra-text {
         padding-bottom: 2px;
    }
}
</style>
