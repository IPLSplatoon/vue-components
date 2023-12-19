<template>
    <div class="width-capped-content vertical-layout">
        <div>Value: {{ value }}</div>
        <!-- #region example -->
        <ipl-small-toggle
            v-model="value"
            label="Small Toggle"
            :disabled="disabled"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
    </div>
</template>

<script setup lang="ts">
import { IplSmallToggle, IplCheckbox } from '../../src';
import { ref } from 'vue';

const value = ref(false);
const disabled = ref(false);
</script>
