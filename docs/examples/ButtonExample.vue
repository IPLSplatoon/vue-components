<template>
    <div class="width-capped-content vertical-layout">
        <!-- #region example -->
        <ipl-button
            label="Button"
            :disabled="disabled"
            :small="small"
        />
        <ipl-button
            label="Button"
            :disabled="disabled"
            :small="small"
            class="no-text-transform"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
        <ipl-checkbox
            v-model="small"
            label="Small"
        />
    </div>
</template>

<script setup lang="ts">
import IplButton from '../../src/components/iplButton.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import { ref } from 'vue';

const disabled = ref(false);
const small = ref(false);
</script>
