<template>
    <div class="demo-preview">
        <component :is="component" />
    </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const props = defineProps<{
    sourceFile: string
}>()

const component = shallowRef(null)
import(`../../examples/${props.sourceFile}.vue`).then(result => {
    component.value = result.default
})
</script>

<style lang="scss">
@use 'src/styles/colors';
@use 'src/styles/constants';

html.dark .demo-preview > *:first-child {
    --line-color: #37445C;
}

.demo-preview {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
        width: 100%;
    }
}

.demo-preview > *:first-child {
    $grid-size: 8px;
    $grid-width: 1px;
    --line-color: #E5E9F0;

    background-size: $grid-size $grid-size;
    background-position: $grid-size $grid-size;
    background-color: var(--vp-c-bg);
    background-image:
        linear-gradient(to right, var(--line-color) $grid-width, transparent $grid-width),
        linear-gradient(to bottom, var(--line-color) $grid-width, transparent $grid-width);

    font-family: constants.$body-font;
    font-weight: 400;
    padding: 24px;

    &.resizable {
        resize: horizontal;
        overflow: hidden;
        max-width: 100%;
        min-width: 150px;
    }
}

.demo-preview > *.alt-background:first-child {
    background-color: var(--vp-c-bg-alt);
}

.demo-preview > *.gray-background:first-child {
    background-color: #bbb;
    --line-color: #999 !important;
}

.width-capped-content > * {
    max-width: 400px;
    margin: 0 auto;
}

.demo-preview > *:not(:first-child, .ipl-expanding-space__content) {
    background-color: var(--vp-c-bg);
    border-radius: 8px;
    padding: 8px;
}

.demo-preview > *:not(:first-child) {
    margin-top: 8px;
}
</style>
