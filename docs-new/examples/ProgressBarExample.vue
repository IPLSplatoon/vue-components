<template>
    <div class="progress-bar-example gray-background">
        <!-- #region example -->
        <ipl-progress-bar
            :value="value"
            :background-color="backgroundColor"
            :color="color"
        />
        <!-- #endregion example -->
    </div>
    <div class="vertical-layout width-capped-content">
        <ipl-input
            v-model="value"
            type="number"
            label="Value"
            name="value"
        />
        <ipl-select
            v-model="color"
            :options="colorOptions"
            label="Color"
        />
        <ipl-select
            v-model="backgroundColor"
            :options="backgroundColorOptions"
            label="Background Color"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IplProgressBar from '../../src/components/iplProgressBar.vue';
import IplInput from '../../src/components/iplInput.vue';
import IplSelect from '../../src/components/iplSelect.vue';
import { progressBarBackgroundColors, progressBarColors } from '../../src/styles/colors';

const value = ref(50);

const backgroundColor = ref<'dark' | 'light'>('dark');
const backgroundColorOptions = Object.keys(progressBarBackgroundColors).map(color => ({ name: color, value: color }));

const color = ref('blue');
const colorOptions = Object.keys(progressBarColors).map(color => ({ name: color, value: color }));
</script>
