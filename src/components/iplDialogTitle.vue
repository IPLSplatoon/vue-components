<template>
    <div
        class="ipl-dialog-title"
        :class="`color-${color}`"
    >
        <span class="ipl-dialog-title__title-text">
            <slot>
                {{ title }}
            </slot>
        </span>
        <div class="ipl-dialog-title__end">
            <slot name="end" />
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
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IplButton from './iplButton.vue';
import { isValidSpaceColor, SpaceColor } from '../helpers/spaceColorHelper';

export default defineComponent({
    name: 'IplDialogTitle',

    components: { IplButton },

    props: {
        title: {
            type: String,
            default: ''
        },
        closingDisabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String as PropType<SpaceColor>,
            default: 'primary',
            validator: (value: string): boolean => {
                return isValidSpaceColor(value);
            }
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
@use 'src/styles/space';

.ipl-dialog-title {
    @include space.space-colors();

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 8px;
    border-radius: constants.$border-radius-outer;

    .ipl-dialog-title__title-text {
        flex-grow: 1;
        font-size: 1.25em;
        font-weight: 500;
    }

    .ipl-dialog-title__end {
        display: flex;
        flex-direction: row;
        align-items: center;

        :deep(> *:not(:last-child)) {
            margin-right: 4px;
        }
    }
}
</style>
