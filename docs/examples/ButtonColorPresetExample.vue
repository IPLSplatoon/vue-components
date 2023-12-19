<template>
    <div class="width-capped-content">
        <!-- #region example -->
        <ipl-button
            label="Button"
            :color="color"
        />
        <!-- #endregion example -->
    </div>
    <div class="width-capped-content">
        <ipl-select
            v-model="color"
            :options="colorOptions"
            label="Color"
        />
    </div>
</template>

<script setup lang="ts">
import { IplButton, IplSelect } from '../../src';
import { buttonColors } from '../../src/styles/colors';
import { ref } from 'vue';

const color = ref('blue');
const colorOptions = Object.keys(buttonColors).map(color => ({ name: color, value: color }));
</script>
