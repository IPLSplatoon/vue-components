<template>
    <div class="space-layout gray-background">
        <!-- #region example -->
        <ipl-space
            color="primary"
            :clickable="clickable"
        >
            Primary Space
        </ipl-space>
        <ipl-space
            color="secondary"
            :clickable="clickable"
        >
            Secondary Space
        </ipl-space>
        <ipl-space
            color="blue"
            :clickable="clickable"
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
    </div>
</template>

<script setup lang="ts">
import IplSpace from '../../src/components/iplSpace.vue';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const clickable = ref(false);
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
