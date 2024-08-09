<template>
    <div class="resizable vertical-layout">
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            name="input-example"
            type="number"
            extra="seconds"
            :loading="loading"
        />
        <ipl-input
            v-model="prefixedInputValue"
            name="input-example"
            prefix="/test/"
            :loading="loading"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="loading"
            label="Loading"
        />
    </div>
</template>

<script setup lang="ts">
import IplInput from '../../src/components/iplInput.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import { ref } from 'vue';

const inputValue = ref(5);
const prefixedInputValue = ref('test2');
const loading = ref(false);
</script>
