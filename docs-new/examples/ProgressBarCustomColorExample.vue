<template>
    <div class="progress-bar-example gray-background">
        <!-- #region example -->
        <ipl-progress-bar
            :value="50"
            :color="color"
        />
        <!-- #endregion example -->
    </div>
    <div class="width-capped-content">
        <ipl-input
            v-model="color"
            type="color"
            label="Color"
            name="color"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IplProgressBar from '../../src/components/iplProgressBar.vue';
import IplInput from '../../src/components/iplInput.vue';

const color = ref('#3382B8');
</script>
