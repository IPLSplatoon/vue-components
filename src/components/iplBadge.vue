<template>
    <span
        class="ipl-badge"
        :style="style"
    >
        <slot />
    </span>
</template>

<script setup lang="ts">
import { buttonColors } from '../styles/colors';
import { computed } from 'vue';
import { getContrastingTextColor } from '../helpers/colorHelper';

const props = withDefaults(defineProps<{
    color?: keyof typeof buttonColors | string
}>(), {
    color: 'blue'
});

const style = computed(() => {
    const backgroundColor = buttonColors[props.color] ?? props.color;
    
    return {
        backgroundColor,
        color: getContrastingTextColor(backgroundColor)
    };
});
</script>

<style scoped lang="scss">
.ipl-badge {
    padding: 2px 5px;
    border-radius: 3px;
    font-weight: 400;
    font-size: 0.75em;
    display: inline-block;
    margin-right: 4px;
    transform: translate(0, -1px);
}
</style>
