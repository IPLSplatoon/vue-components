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
        <ipl-input
            v-model="color"
            name="color"
            type="color"
            label="Color"
        />
    </div>
</template>

<script setup lang="ts">
import IplButton from '../../src/components/iplButton.vue';
import IplInput from '../../src/components/iplInput.vue';
import { ref } from 'vue';

const color = ref('#3382B8');
</script>
