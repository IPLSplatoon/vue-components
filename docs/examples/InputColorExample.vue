<template>
    <div class="vertical-layout">
        <div>
            Value: {{ inputValue }}
        </div>
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            label="Color Input"
            type="color"
            name="colorInput"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplInput } from '../../src';
import { ref } from 'vue';

const inputValue = ref('#3382B8');
</script>
