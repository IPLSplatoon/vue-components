<template>
    <div
        style="position: relative; overflow: hidden; min-height: 150px"
        class="sidebar-example-layout"
    >
        <!-- #region example -->
        <ipl-dialog
            v-model:is-open="dialogOpen"
            style="width: 500px"
            :persistent="persistent"
        >
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
                        label="Close dialog"
                        color="red"
                        @click="dialogOpen = false"
                    />
                </ipl-space>
            </div>
        </ipl-dialog>
        <ipl-button
            label="Open dialog"
            @click="dialogOpen = true"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="persistent"
            label="Persistent"
        />
    </div>
</template>

<script setup lang="ts">
import { IplButton, IplSpace, IplDialog, IplCheckbox } from '../../src';
import { ref } from 'vue';

const dialogOpen = ref(false);
const persistent = ref(false);
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
