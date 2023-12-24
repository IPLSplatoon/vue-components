<template>
    <div
        style="position: relative; overflow: hidden; min-height: 150px"
        class="sidebar-example-layout"
    >
        <!-- #region example -->
        <ipl-sidebar v-model:is-open="sidebarOpen">
            <div class="width-capped-content">
                <ipl-space
                    color="light"
                    class="vertical-layout"
                >
                    <div>Hello!</div>
                    <ipl-button
                        label="Button!"
                    />
                    <ipl-button
                        label="Close sidebar"
                        color="red"
                        @click="sidebarOpen = false"
                    />
                </ipl-space>
            </div>
        </ipl-sidebar>
        <ipl-button
            label="Open sidebar"
            @click="sidebarOpen = true"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplSidebar, IplButton, IplSpace } from '../../src';
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
