<template>
    <div class="alt-background">
        <!-- #region example -->
        <ipl-pagination
            v-model="page"
            :max-page="10"
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
import { IplPagination, IplCheckbox } from '../../src';
import { ref } from 'vue';

const page = ref(1);
const loading = ref(false);
</script>
