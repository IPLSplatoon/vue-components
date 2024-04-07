<template>
    <div class="vertical-layout width-capped-content">
        <!-- #region example -->
        <div>Uploaded file: {{ file?.name }}</div>
        <ipl-upload
            v-model="file"
            placeholder="Click to upload a file..."
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import IplUpload from '../../src/components/iplUpload.vue';
import { ref } from 'vue';

const file = ref<File | null>(null);
</script>
