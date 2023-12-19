<template>
    <div>
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            label="Input"
            name="input-example"
            :disabled="disabled"
            :loading="loading"
            :centered="centered"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
        <ipl-checkbox
            v-model="loading"
            label="Loading"
        />
        <ipl-checkbox
            v-model="centered"
            label="Centered"
        />
    </div>
</template>

<script setup lang="ts">
import IplInput from '../../src/components/iplInput.vue';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const inputValue = ref('Input Value!');
const loading = ref(false);
const disabled = ref(false);
const centered = ref(false);
</script>
