<template>
    <div class="width-capped-content vertical-layout">
        <div>Value: {{ value }}</div>
        <!-- #region example -->
        <ipl-checkbox
            v-model="value"
            label="Checkbox"
            :disabled="disabled"
            :small="small"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="small"
            label="Small"
        />
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
    </div>
</template>

<script setup lang="ts">
import { IplCheckbox } from '../../src';
import { ref } from 'vue';

const value = ref(false);
const small = ref(false);
const disabled = ref(false);
</script>
