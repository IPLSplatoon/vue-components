<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="content-wrapper">
        <page-index />
        <h2 id="expanding-space-example">ipl-expanding-space</h2>
        <expanding-space-example />
        <h2 id="expanding-space-group-example">ipl-expanding-space-group</h2>
        <expanding-space-group-example />
        <h2 id="button-example">ipl-button</h2>
        <button-example />
        <h2 id="async-button-example">ipl-button (async)</h2>
        <async-button-example />
        <h2 id="toggle-example">ipl-toggle</h2>
        <toggle-example />
        <h2 id="dialog-title-example">ipl-dialog-title</h2>
        <dialog-title-example />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import ExpandingSpaceExample from './components/ExpandingSpaceExample.vue';
import ExpandingSpaceGroupExample from './components/ExpandingSpaceGroupExample.vue';
import PageIndex from './components/PageIndex.vue';
import ButtonExample from './components/ButtonExample.vue';
import AsyncButtonExample from './components/AsyncButtonExample.vue';
import ToggleExample from './components/ToggleExample.vue';
import DialogTitleExample from './components/DialogTitleExample.vue';

export default defineComponent({
    components: {
        DialogTitleExample,
        ToggleExample,
        ButtonExample,
        AsyncButtonExample,
        PageIndex,
        ExpandingSpaceGroupExample,
        ExpandingSpaceExample
    }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import 'src/styles/colors';

body {
    color: $text-color;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

.content-wrapper {
    max-width: 500px;
    margin: 0 auto;
}

.top-margin {
    margin-top: 8px;
}
</style>
