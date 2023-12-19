<template>
    <div class="resizable">
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            label="Input"
            name="input-example"
            type="number"
            extra="seconds"
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
const loading = ref(false);
</script>
