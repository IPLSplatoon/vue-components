<template>
    <div class="ipl-dialog-title">
        <span class="ipl-dialog-title__title-text">{{ title }}</span>
        <button
            data-test="close-button"
            class="close-icon"
            :disabled="closingDisabled"
            @click="close"
        >
            <font-awesome-icon icon="times" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes);

export default defineComponent({
    name: 'IplDialogTitle',

    components: { FontAwesomeIcon },

    props: {
        title: {
            type: String,
            required: true
        },
        closingDisabled: {
            type: Boolean,
            default: false
        }
    },

    emits: ['close'],

    setup(props, { emit }) {
        return {
            close() {
                emit('close');
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-dialog-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    font-weight: 500;
    font-size: 1.25em;
    background-color: var(--ipl-bg-primary);
    padding: 0 8px;
    border-radius: constants.$border-radius-outer;
    color: var(--ipl-body-text-color);

    .ipl-dialog-title__title-text {
        flex-grow: 1;
    }

    .close-icon {
        margin-right: 2px;
        padding: 4px 7px;
        border-radius: constants.$border-radius-inner;
        transition-property: background-color;
        transition-duration: constants.$transition-duration-med;
        color: var(--ipl-body-text-color);
        border: 0;
        background-color: transparent;
        font-size: 1em;
        line-height: 1em;
        cursor: default;

        &:focus-visible {
            outline: var(--ipl-focus-outline-color) solid 2px;
        }

        &:disabled {
            color: var(--ipl-disabled-body-text-color);
        }

        &:not(:disabled) {
            &:hover {
                background-color: var(--ipl-bg-primary-hover);
            }

            &:active {
                background-color: var(--ipl-bg-primary-active);
            }
        }
    }
}
</style>
