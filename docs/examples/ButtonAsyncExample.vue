<template>
    <div class="width-capped-content vertical-layout">
        <!-- #region example -->
        <ipl-button
            label="Success"
            async
            progress-message="Succeeding..."
            success-message="Success!"
            :disable-on-success="disableOnSuccess"
            :color="useConflictingPresetColors ? 'green' : 'blue'"
            @click="asyncSuccess"
        />
        <ipl-button
            label="Failure"
            async
            progress-message="Failing..."
            error-message="Failed!"
            :disable-on-success="disableOnSuccess"
            :color="useConflictingPresetColors ? 'red' : 'blue'"
            @click="asyncFailure"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disableOnSuccess"
            label="Disable on success"
        />
        <ipl-checkbox
            v-model="useConflictingPresetColors"
            label="Use conflicting color presets"
        />
    </div>
</template>

<script setup lang="ts">
import { IplButton } from '../../src';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const disableOnSuccess = ref(false);
const useConflictingPresetColors = ref(false);

async function asyncSuccess() {
    return new Promise(resolve => {
        setTimeout(resolve, 2500);
    });
}
async function asyncFailure() {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 2500);
    });
}
</script>
