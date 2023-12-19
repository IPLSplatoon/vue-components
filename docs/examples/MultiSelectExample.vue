<template>
    <div class="width-capped-content vertical-layout resizable">
        <div>
            Selected: {{ selectedOptions }}
        </div>
        <!-- #region example -->
        <ipl-multi-select
            v-model="selectedOptions"
            :options="[
                { name: 'Option 1', value: 'opt1' },
                { name: 'Option 2', value: 'opt2' },
                { name: 'Option 3', value: 'opt3' },
                { name: 'Option 4', value: 'opt4' }
            ]"
            label="Multi-Select"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplMultiSelect } from '../../src';
import { ref } from 'vue';

const selectedOptions = ref([]);
</script>
