<template>
    <div class="ipl-dialog-title layout horizontal center-vertical">
        <span class="ipl-dialog-title__title-text">{{ title }}</span>
        <font-awesome-icon
            icon="times"
            class="close-icon"
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
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-dialog-title {
    width: calc(100% - 16px);
    height: 40px;
    font-weight: 500;
    font-size: 1.25em;
    background-color: $background-primary;
    padding: 0 8px;
    border-radius: $border-radius-outer;

    .ipl-dialog-title__title-text {
        flex-grow: 1;
    }

    .close-icon {
        cursor: pointer;
        margin-right: 8px;
        padding: 4px 7px;
        border-radius: $border-radius-inner;
        transition-duration: $transition-duration-med;

        &:hover {
            background-color: $background-primary-hover;
        }

        &:active {
            background-color: $background-primary-active;
        }
    }
}
</style>
