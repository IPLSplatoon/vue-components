<template>
    <div class="ipl-dialog-title">
        <span class="ipl-dialog-title__title-text">{{ title }}</span>
        <font-awesome-icon
            icon="times"
            class="close-icon"
            :class="{ 'closing-disabled': closingDisabled }"
            data-test="close-button"
            @click="close"
        />
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
                if (!props.closingDisabled) {
                    emit('close');
                }
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-dialog-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    font-weight: 500;
    font-size: 1.25em;
    background-color: $background-primary;
    padding: 0 8px;
    border-radius: $border-radius-outer;
    color: $text-color;

    .ipl-dialog-title__title-text {
        flex-grow: 1;
    }

    .close-icon {
        cursor: pointer;
        margin-right: 2px;
        padding: 4px 7px;
        border-radius: $border-radius-inner;
        transition-duration: $transition-duration-med;
        color: $text-color;

        &.closing-disabled {
            color: $text-color-disabled;
            cursor: default;
        }

        &:not(.closing-disabled) {
            &:hover {
                background-color: $background-primary-hover;
            }

            &:active {
                background-color: $background-primary-active;
            }
        }
    }
}
</style>
