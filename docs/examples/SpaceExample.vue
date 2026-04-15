<template>
    <div class="space-layout gray-background">
        <!-- #region example -->
        <ipl-space
            color="primary"
            :clickable="clickable"
            :disabled="disabled"
        >
            Primary Space
        </ipl-space>
        <ipl-space
            color="secondary"
            :clickable="clickable"
            :disabled="disabled"
        >
            Secondary Space
        </ipl-space>
        <ipl-space
            color="blue"
            :clickable="clickable"
            :disabled="disabled"
        >
            Blue Space
        </ipl-space>
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox 
            v-model="clickable"
            label="Clickable"
        />
        <ipl-checkbox
            v-model="disabled"
            label="Disabled (when clickable)"
        />
    </div>
</template>

<script setup lang="ts">
import IplSpace from '../../src/components/iplSpace.vue';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const clickable = ref(false);
const disabled = ref(false);
</script>

<style lang="scss">
.space-layout {
    display: flex;

    > * {
        width: 100%;
        height: 36px;

        &:not(:last-child) {
            margin-right: 12px;
        }
    }
}
</style>
