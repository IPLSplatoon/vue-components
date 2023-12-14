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

html.dark .demo-preview > *:first-child {
    --line-color: #37445C;
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

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    padding: 24px;
}

.width-capped-content > * {
    max-width: 400px;
    margin: 0 auto;
}

.demo-preview > *:not(:first-child) {
    margin-top: 8px;
    background-color: var(--vp-c-bg);
    border-radius: 8px;
    padding: 8px;
}
</style>
