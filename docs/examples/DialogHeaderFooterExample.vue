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
            <template #header>
                <ipl-dialog-title
                    title="Test Dialog"
                    @close="dialogOpen = false"
                />
            </template>
            <div class="width-capped-content">
                <ipl-space
                    color="light"
                    class="vertical-layout"
                >
                    <div>Hello!</div>
                    <ipl-button
                        label="Button!"
                    />
                    <ipl-small-toggle
                        v-model="doOverflow"
                        label="Overflow?"
                    />
                    <div v-if="doOverflow">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </ipl-space>
            </div>
            <template #footer>
                <div class="width-capped-content">
                    <ipl-button
                        label="Close dialog"
                        color="red"
                        @click="dialogOpen = false"
                    />
                </div>
            </template>
        </ipl-dialog>
        <ipl-button
            label="Open dialog (Header & Footer)"
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
import { IplButton, IplSpace, IplDialog, IplCheckbox, IplSmallToggle, IplDialogTitle } from '../../src';
import { ref } from 'vue';

const dialogOpen = ref(false);
const persistent = ref(false);
const doOverflow = ref(true);
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
