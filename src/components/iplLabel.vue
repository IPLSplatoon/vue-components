<template>
    <label class="ipl-label">
        <slot />
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IplLabel'
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

label {
    color: var(--ipl-input-color);
    font-size: 0.75em;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    transition-duration: constants.$transition-duration-low;
}
</style>
