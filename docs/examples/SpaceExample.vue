<template>
    <div class="horizontal-layout space-layout gray-background">
        <!-- #region example -->
        <ipl-space
            color="dark"
            :clickable="clickable"
        />
        <ipl-space
            color="light"
            :clickable="clickable"
        />
        <ipl-space
            color="blue"
            :clickable="clickable"
        />
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
.space-layout > * {
    flex-grow: 1;
    height: 36px;
}
</style>
