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
            :disabled="disabled"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
    </div>
</template>

<script setup lang="ts">
import { IplInput } from '../../src';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const inputValue = ref('#3382B8');
const disabled = ref(false);
</script>
