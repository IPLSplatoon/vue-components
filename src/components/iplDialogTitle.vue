<template>
    <div class="ipl-dialog-title">
        <span class="ipl-dialog-title__title-text">{{ title }}</span>
        <ipl-button
            data-test="close-button"
            class="close-button"
            :disabled="closingDisabled"
            :icon="faTimes"
            color="transparent"
            inline
            small
            @click="close"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IplButton from './iplButton.vue';

export default defineComponent({
    name: 'IplDialogTitle',

    components: { IplButton },

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
            },
            faTimes
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
    background-color: var(--ipl-bg-primary);
    padding: 4px 8px;
    border-radius: constants.$border-radius-outer;
    color: var(--ipl-body-text-color);

    .ipl-dialog-title__title-text {
        flex-grow: 1;
        font-size: 1.25em;
        font-weight: 500;
    }
}
</style>
