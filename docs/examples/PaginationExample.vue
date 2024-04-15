<template>
    <div class="gray-background vertical-layout">
        <!-- #region example -->
        <ipl-pagination
            v-model="page"
            :max-page="10"
            :loading="loading"
        />
        <ipl-pagination
            v-model="page"
            :max-page="10"
            :loading="loading"
            color="secondary"
        />
        <ipl-pagination
            v-model="page"
            :max-page="10"
            :loading="loading"
            color="blue"
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
