<template>
    <div
        class="ipl-spinner"
        :style="{
            '--ipl-spinner-size': props.size,
            '--ipl-spinner-width': props.width,
            '--ipl-spinner-color': props.color
        }"
    >
        <div class="spinner-wrapper">
            <div class="spinner">
                <div class="left">
                    <div class="circle" />
                </div>
                <div class="right">
                    <div class="circle" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { themeColors } from '../styles/colors';

const props = withDefaults(defineProps<{
    size?: string
    width?: string
    color?: string
}>(), {
    size: '4px',
    width: '36px',
    color: themeColors.blue
});
</script>

<style lang="scss" scoped>
$container-padding: 4px;

$arc-duration: 1333ms;
$cycle-duration: calc(4 * $arc-duration);
$linear-rotate-duration: calc($arc-duration * 360 / 306);
$indeterminate-easing: cubic-bezier(0.4, 0, 0.2, 1);

.ipl-spinner {
    width: var(--ipl-spinner-width);
    height: var(--ipl-spinner-width);
    display: inline-flex;
    vertical-align: middle;
    min-block-size: var(--ipl-spinner-width);
    min-inline-size: var(--ipl-spinner-width);
    position: relative;
    align-items: center;
    justify-content: center;
    contain: strict;
    content-visibility: auto;
}

.spinner-wrapper {
    flex: 1;
    align-self: stretch;
    margin: $container-padding;
    will-change: transform;
    animation: linear infinite linear-rotate;
    animation-duration: $linear-rotate-duration;
}

.spinner-wrapper, .spinner, .left, .right, .circle {
    position: absolute;
    inset: 0;
}

.spinner {
    will-change: transform;
    animation: infinite both rotate-arc;
    animation-duration: $cycle-duration;
    animation-timing-function: $indeterminate-easing;
}

.left {
    overflow: hidden;
    inset: 0 50% 0 0;
}

.right {
    overflow: hidden;
    inset: 0 0 0 50%;
}

.circle {
    box-sizing: border-box;
    border-radius: 50%;
    border: solid var(--ipl-spinner-size);
    border-color: var(--ipl-spinner-color) var(--ipl-spinner-color) transparent transparent;
    will-change: transform;
    animation: expand-arc;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-duration: $arc-duration, $cycle-duration;
    animation-timing-function: $indeterminate-easing;
}

.left .circle {
    rotate: 135deg;
    inset: 0 -100% 0 0;
}

.right .circle {
    rotate: 100deg;
    inset: 0 0 0 -100%;
    animation-delay: calc(-0.5 * $arc-duration), 0ms;
}

@keyframes expand-arc {
    0% {
        transform: rotate(265deg);
    }
    50% {
        transform: rotate(130deg);
    }
    100% {
        transform: rotate(265deg);
    }
}

@keyframes rotate-arc {
    12.5% {
        transform: rotate(135deg);
    }
    25% {
        transform: rotate(270deg);
    }
    37.5% {
        transform: rotate(405deg);
    }
    50% {
        transform: rotate(540deg);
    }
    62.5% {
        transform: rotate(675deg);
    }
    75% {
        transform: rotate(810deg);
    }
    87.5% {
        transform: rotate(945deg);
    }
    100% {
        transform: rotate(1080deg);
    }
}

@keyframes linear-rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
