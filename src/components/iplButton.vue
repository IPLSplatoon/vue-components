<template>
    <a
        class="ipl-button"
        href="#"
        :style="buttonStyle"
        :class="{
            disabled: disabledInternal,
            'has-icon': isIconButton,
            'small': small,
            'is-loading': buttonState === 'loading'
        }"
        @click="handleClick"
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
        />
    </a>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, PropType, Ref, ref } from 'vue';
import { buttonColors, themeColors } from '../styles/colors';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { getContrastingTextColor } from '../helpers/colorHelper';

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
                return value.startsWith('#') || Object.keys(buttonColors).includes(value);
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
        }
    },

    emits: [ 'click' ],

    setup(props, { emit }) {
        if (isEmpty(props.icon) && isEmpty(props.label)) {
            throw new Error('ipl-button requires an icon or label to be provided.');
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
            const warningColor = props.color === 'red' ? 'orange' : 'red';
            if (props.requiresConfirmation && isClicked.value) return warningColor;

            switch (buttonState.value) {
                case 'error':
                    return warningColor;
                case 'success':
                    return props.color === 'green' ? 'green-success' : 'green';
                default:
                    return props.color;
            }
        });
        const isClicked = ref(false);

        return {
            buttonStyle: computed(() => {
                const buttonColor = buttonColors[colorInternal.value] ?? colorInternal.value;
                return ({
                    backgroundColor: buttonColor,
                    color: disabledInternal.value ? themeColors.disabledText : getContrastingTextColor(buttonColor)
                });
            }),
            async handleClick() {
                if (disabledInternal.value) {
                    return;
                }

                if (props.requiresConfirmation && !isClicked.value) {
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
                        if (!instance || !instance.vnode.props) {
                            throw new Error('ipl-button instance is missing click handler');
                        }
                        await instance.vnode.props.onClick();
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
            })
        };
    }
});
</script>

<style lang="scss">
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-button {
    text-decoration: none !important;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 700;
    color: white;
    text-align: center;

    border: none;
    border-radius: $border-radius-inner;
    cursor: pointer;
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px 0;
    position: relative;
    outline-width: 0;

    transition-duration: $transition-duration-low;

    &.has-icon {
        flex-grow: 0;
        font-size: 26px;
        width: 40px;
        min-width: 40px;
        height: 35px;
        padding: 5px 0 0;

        &.small {
            font-size: 20px;
            width: 30px;
            min-width: 30px;
            height: 27px;
            padding: 3px 0 0;
        }
    }

    &.small {
        font-size: 0.75em;
        padding: 7px 0;
    }

    .label, .icon {
        z-index: 3;
        position: relative;
        user-select: none;
    }

    &.disabled {
        background-color: $background-tertiary !important;
        color: $text-color-disabled;
        cursor: default;
    }

    &:after {
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0);
        transition-duration: $transition-duration-low;
        pointer-events: none;
    }

    &.is-loading {
        cursor: progress;
    }

    &:not(.disabled) {
        &:hover {
            &:after {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }

        &:active {
            &:after {
                background-color: rgba(0, 0, 0, 0.2);
            }
        }

        &:focus {
            outline: 2px solid white;
        }
    }
}
</style>