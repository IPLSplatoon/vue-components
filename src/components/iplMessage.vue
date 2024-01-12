<template>
    <div
        class="ipl-message__wrapper"
        :class="`ipl-message__type-${type}`"
    >
        <font-awesome-icon
            class="icon"
            :icon="icon"
        />
        <div class="message-content">
            <button
                v-if="closeable"
                class="close-button"
                @click="close"
            >
                <font-awesome-icon icon="times" />
            </button>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

library.add(faInfoCircle, faExclamationTriangle, faExclamationCircle, faTimes);

export default defineComponent({
    name: 'IplMessage',

    components: { FontAwesomeIcon },

    props: {
        type: {
            type: String as PropType<'error' | 'info' | 'warning'>,
            required: true,
            validator: (value: string): boolean => {
                return ['error', 'info', 'warning'].includes(value);
            }
        },
        closeable: {
            type: Boolean,
            default: false
        }
    },

    emits: ['close'],

    setup(props, { emit }) {
        return {
            icon: computed(() => {
                switch (props.type) {
                    case 'info':
                        return 'info-circle';
                    case 'error':
                        return 'exclamation-circle';
                    case 'warning':
                        return 'exclamation-triangle';
                    default:
                        throw new Error(`No icon found for type '${props.type}'`);
                }
            }),
            close() {
                emit('close');
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/colors';
@use 'src/styles/constants';

.ipl-message__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: constants.$border-radius-outer;
    border-width: 2px;
    border-style: solid;
    padding: 8px;
    color: var(--ipl-body-text-color);

    > .icon {
        font-size: 25px;
        margin-right: 8px;
    }

    > .message-content {
        overflow-wrap: anywhere;
        flex-grow: 1;

        > .close-button {
            float: right;
            font-size: 0.9em;
            width: 1.1em;
            height: 1.1em;
            border: 0;
            background-color: transparent;
            color: var(--ipl-text-button-color);
            cursor: default;
            border-radius: constants.$border-radius-inner;
            text-align: center;
            transition-property: color, background-color;
            transition-duration: constants.$transition-duration-low;

            &:hover {
                color: var(--ipl-text-button-color-hover);
                background-color: var(--ipl-hover-overlay-color);
            }

            &:active {
                color: var(--ipl-text-button-color-active);
                background-color: var(--ipl-active-overlay-color);
            }

            &:focus-visible {
                outline: var(--ipl-focus-outline-color) solid 2px;
            }
        }
    }

    &.ipl-message__type-info {
        border-color: colors.$info-color;
        background-color: colors.$info-background-color;
    }

    &.ipl-message__type-warning {
        border-color: colors.$warning-color;
        background-color: colors.$warning-background-color;
    }

    &.ipl-message__type-error {
        border-color: colors.$error-color;
        background-color: colors.$error-background-color;
    }
}
</style>
