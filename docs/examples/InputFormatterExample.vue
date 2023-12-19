<template>
    <div class="vertical-layout">
        <div>
            This input's value will be limited in length.<br>
            Value: {{ inputValue }}
        </div>
        <!-- #region example -->
        <ipl-input
            v-model="inputValue"
            label="Input"
            name="input-example"
            :formatter="(value: string) => value.substring(0, 10)"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import IplInput from '../../src/components/iplInput.vue';
import { ref } from 'vue';

const inputValue = ref('Test Value');
</script>
