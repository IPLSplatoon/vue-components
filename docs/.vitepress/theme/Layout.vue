<template>
    <DefaultLayout />
</template>

<script setup lang="ts">
import DefaultLayout from 'vitepress/dist/client/theme-default/Layout.vue';
import { useData } from 'vitepress';
import { onMounted, watch } from 'vue';

const { isDark } = useData();

onMounted(() => {
    watch(isDark, newValue => {
        if (newValue) {
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
        }
    }, { immediate: true });
});
</script>
