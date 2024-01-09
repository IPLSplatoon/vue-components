<template>
    <div
        class="ipl-progress-bar__wrapper"
        :class="`background-${backgroundColor}`"
    >
        <div
            class="progress-bar"
            :style="{ width: `${normalizedValue}%`, backgroundColor: normalizedColor }"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { progressBarColors } from '../styles/colors';

export default defineComponent({
    name: 'IplProgressBar',

    props: {
        value: {
            type: Number,
            required: true
        },
        color: {
            type: String as PropType<string | keyof typeof progressBarColors>,
            default: 'blue',
            validator: (value: string) => {
                return (value.startsWith('#') && value.trim().length === 7) || Object.keys(progressBarColors).includes(value);
            }
        },
        backgroundColor: {
            type: String as PropType<'light' | 'dark' | 'primary' | 'secondary'>,
            default: 'secondary',
            validator: (value: string) => {
                return value === 'dark' || value === 'light' || value === 'primary' || value === 'secondary';
            }
        }
    },

    setup(props) {
        return {
            normalizedValue: computed(() => Math.max(Math.min(props.value, 100), 0)),
            normalizedColor: computed(() => {
                if (props.color.startsWith('#')) {
                    return props.color;
                }
                return (progressBarColors as Record<string, string>)[props.color];
            })
        };
    }
});
</script>

<style lang="scss">
@use 'src/styles/constants';

.ipl-progress-bar__wrapper {
    height: 16px;
    border-radius: 8px;
    padding: 3px;
    display: block;
    transition-duration: constants.$transition-duration-low;
    box-sizing: border-box;

    .progress-bar {
        height: 100%;
        min-width: 10px;
        border-radius: 6px;
        transition-duration: constants.$transition-duration-low;
    }

    &.background-light, &.background-secondary {
        background-color: var(--ipl-bg-secondary);
    }

    &.background-dark, &.background-primary {
        background-color: var(--ipl-bg-primary);
    }
}
</style>
