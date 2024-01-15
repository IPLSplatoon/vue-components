<template>
    <div class="alt-background">
        <!-- #region example -->
        <ipl-pagination
            v-model="page"
            :max-page="10"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplPagination } from '../../src';
import { ref } from 'vue';

const page = ref(1);
</script>
