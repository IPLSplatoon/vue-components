<template>
    <component
        :is="hasLink ? 'a' : 'button'"
        :href="disabledInternal ? undefined : href"
        :target="hasLink ? '_blank' : undefined"
        class="ipl-button"
        :style="buttonStyle"
        :class="{
            disabled: disabledInternal,
            'has-icon': isIconButton,
            'small': small,
            'is-loading': buttonState === 'loading',
            'has-link': hasLink,
            'is-transparent': color === 'transparent',
            'inline': inline
        }"
        :disabled="hasLink ? undefined : disabledInternal"
        @click="handleClick"
        @contextmenu="$emit('rightClick', $event)"
    >
        <span
            v-if="!isIconButton"
            class="label"
        >
            {{ labelInternal }}
        </span>
        <font-awesome-icon
            v-else
            :icon="icon"
            class="icon"
            fixed-width
        />
    </component>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, Ref, ref } from 'vue';
import { buttonColors } from '../styles/colors';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { getContrastingTextColor } from '../helpers/colorHelper';
import { isBlank } from '../helpers/stringHelper';

export default defineComponent({
    name: 'IplButton',

    components: {
        FontAwesomeIcon
    },

    props: {
        label: {
            type: String,
            default: null
        },
        icon: {
            type: [ Array, String ] as PropType<Array<string> | string>,
            default: null
        },
        color: {
            type: String as PropType<string>,
            default: 'blue',
            validator: (value: string) => {
                return value === 'transparent' || value.startsWith('#') || Object.keys(buttonColors).includes(value);
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        async: {
            type: Boolean,
            default: false
        },
        progressMessage: {
            type: String,
            default: 'Working...'
        },
        successMessage: {
            type: String,
            default: 'Done!'
        },
        requiresConfirmation: {
            type: Boolean,
            default: false
        },
        shortConfirmationMessage: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        disableOnSuccess: {
            type: Boolean,
            default: false
        },
        href: {
            type: [String, null] as PropType<string | null>,
            default: null
        },
        inline: {
            type: Boolean,
            default: false
        }
    },

    emits: [ 'click', 'rightClick' ],

    setup(props, { emit }) {
        if (isEmpty(props.icon) && isEmpty(props.label)) {
            console.warn('ipl-button requires an icon or label to be provided.');
        }

        const instance = getCurrentInstance();
        let resetTimeout: number | null = null;
        let confirmationResetTimeout: number | null = null;
        const buttonState: Ref<'idle' | 'error' | 'success' | 'loading'> = ref('idle');
        const setState = (state: 'error' | 'success') => {
            buttonState.value = state;
            if (resetTimeout !== null) {
                clearTimeout(resetTimeout);
            }
            resetTimeout = window.setTimeout(() => {
                buttonState.value = 'idle';
            }, 5000);
        };
        const disabledInternal = computed(() =>
            props.disabled
            || (props.async && buttonState.value === 'loading')
            || (props.disableOnSuccess && buttonState.value === 'success'));
        const colorInternal = computed(() => {
            if (disabledInternal.value) {
                return props.color === 'transparent' ? props.color : 'var(--ipl-bg-tertiary)';
            }

            const warningColor = props.color === 'red' ? buttonColors.orange : buttonColors.red;
            if (props.requiresConfirmation && isClicked.value) return warningColor;

            switch (buttonState.value) {
                case 'error':
                    return warningColor;
                case 'success':
                    return props.color === 'green' ? buttonColors['green-success'] : buttonColors.green;
                default:
                    return buttonColors[props.color] ?? props.color;
            }
        });
        const textColor = computed(() => {
            if (disabledInternal.value) {
                return 'var(--ipl-disabled-body-text-color)';
            } else if (props.color === 'transparent') {
                return buttonState.value === 'idle' ? undefined : colorInternal.value;
            } else {
                return getContrastingTextColor(colorInternal.value);
            }
        });
        const isClicked = ref(false);
        const hasLink = computed(() => !isBlank(props.href));

        return {
            buttonStyle: computed(() => {
                return ({
                    backgroundColor: props.color === 'transparent' ? props.color : colorInternal.value,
                    color: textColor.value
                });
            }),
            async handleClick(event: Event) {
                if (disabledInternal.value) {
                    return;
                }

                if (props.requiresConfirmation && !isClicked.value) {
                    if (hasLink.value) {
                        event.preventDefault();
                    }
                    isClicked.value = true;
                    confirmationResetTimeout = window.setTimeout(() => {
                        isClicked.value = false;
                    }, 5000);
                    return;
                } else if (props.requiresConfirmation && isClicked.value) {
                    isClicked.value = false;
                    if (confirmationResetTimeout !== null) {
                        clearTimeout(confirmationResetTimeout);
                    }
                }

                if (!props.async && !props.disableOnSuccess) {
                    emit('click');
                } else {
                    try {
                        if (props.async) {
                            buttonState.value = 'loading';
                        }

                        if (instance && instance.vnode.props && instance.vnode.props.onClick) {
                            await instance.vnode.props.onClick();
                        }

                        setState('success');
                    } catch (e) {
                        setState('error');
                        throw e;
                    }
                }
            },
            buttonState,
            isIconButton: computed(() => props.icon != null),
            disabledInternal,
            labelInternal: computed(() => {
                if (props.requiresConfirmation && isClicked.value) {
                    return props.shortConfirmationMessage ? 'Confirm?' : 'Are you sure?';
                }
                if (!props.async && !props.disableOnSuccess) return props.label;

                switch (buttonState.value) {
                    case 'error':
                        return 'Error!';
                    case 'loading':
                        return props.progressMessage;
                    case 'success':
                        return props.successMessage;
                    default:
                        return props.label;
                }
            }),
            isBlank,
            hasLink
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-button {
    text-decoration: none !important;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 700;
    font-family: constants.$body-font;
    line-height: 1.2;
    color: white;
    text-align: center;
    box-sizing: border-box;

    border: none;
    border-radius: constants.$border-radius-inner;
    cursor: default;
    display: block;
    width: 100%;
    padding: 0.6em;
    position: relative;
    outline-width: 0;

    transition: background-color constants.$transition-duration-low, color constants.$transition-duration-low;

    &.inline {
        width: auto;
        display: inline;
    }

    &.has-link {
        cursor: pointer;
    }

    &.has-icon {
        flex-grow: 0;
        height: 2.4em;
        width: 2.4em;
        min-width: 2.4em;
        padding: 0.4em;
    }

    &.small {
        font-size: 0.75em;
    }

    .label, .icon {
        z-index: 3;
        position: relative;
        user-select: none;
    }

    .icon {
        height: 100%;
        width: 100%;
    }

    &.disabled {
        cursor: default;

        &.is-transparent {
            opacity: 0.75;
        }
    }

    &:after {
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;
        transition-duration: constants.$transition-duration-low;
        pointer-events: none;
        border-radius: constants.$border-radius-inner;
    }

    &.is-loading {
        cursor: progress;
    }

    &:focus-visible {
        outline: var(--ipl-focus-outline-width) solid var(--ipl-focus-outline-color);
    }

    &.is-transparent {
        color: var(--ipl-text-button-color);
    }

    &:not(.disabled) {
        &.is-transparent {
            &:hover {
                color: var(--ipl-text-button-color-hover);
            }

            &:active {
                color: var(--ipl-text-button-color-active);
            }
        }

        &:hover:after {
            opacity: 0.1;
        }

        &:active:after {
            opacity: 0.2;
        }
    }
}
</style>
