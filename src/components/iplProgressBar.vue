<template>
    <div
        class="ipl-progress-bar__wrapper"
        :style="{ backgroundColor: hexBackgroundColor }"
    >
        <div
            class="progress-bar"
            :style="{ width: `${normalizedValue}%`, backgroundColor: normalizedColor }"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { progressBarBackgroundColors, progressBarColors } from '../styles/colors';

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
            type: String as PropType<keyof typeof progressBarBackgroundColors>,
            default: 'light',
            validator: (value: string) => {
                return Object.keys(progressBarBackgroundColors).includes(value);
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
            }),
            hexBackgroundColor: computed(() => progressBarBackgroundColors[props.backgroundColor])
        };
    }
});
</script>

<style lang="scss">
@import './src/styles/constants';

.ipl-progress-bar__wrapper {
    height: 16px;
    border-radius: 8px;
    padding: 3px;
    display: block;
    transition-duration: $transition-duration-low;
    box-sizing: border-box;

    .progress-bar {
        height: 100%;
        min-width: 10px;
        border-radius: 6px;
        transition-duration: $transition-duration-low;
    }
}
</style>
