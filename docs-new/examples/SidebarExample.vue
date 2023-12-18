<template>
    <div
        style="position: relative; overflow: hidden; min-height: 150px"
        class="sidebar-example-layout"
    >
        <!-- #region example -->
        <ipl-sidebar v-model:is-open="sidebarOpen">
            Hello!
        </ipl-sidebar>
        <ipl-button
            label="Open sidebar"
            @click="sidebarOpen = true"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplSidebar, IplButton } from '../../src';
import { ref } from 'vue';

const sidebarOpen = ref(false);
</script>

<style lang="scss">
.sidebar-example-layout {
    display: flex;
    align-items: center;
    justify-content: center;

    > .ipl-button {
        width: auto;
    }
}
</style>
