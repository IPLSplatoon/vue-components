<template>
    <div>
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            placeholder="Search for a player..."
            name="input-example"
            :disabled="disabled"
            :loading="loading"
            theme="large"
            type="search"
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
    </div>
</template>

<script setup lang="ts">
import IplInput from '../../src/components/iplInput.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import { ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);
const disabled = ref(false);
</script>
