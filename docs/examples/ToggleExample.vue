<template>
    <div class="width-capped-content vertical-layout">
        <div>Value: {{ value }}</div>
        <!-- #region example -->
        <ipl-toggle v-model="value" />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplToggle } from '../../src';
import { ref } from 'vue';

const value = ref(false);
</script>
