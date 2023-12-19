<template>
    <div class="vertical-layout resizable">
        <div>Selected: {{ selectedOption }}</div>
        <!-- #region example -->
        <ipl-radio
            v-model="selectedOption"
            :options="[
                { name: 'Option 1', value: 'opt1' },
                { name: 'Option 2', value: 'opt2' },
                { name: 'Option 3', value: 'opt3' },
                { name: 'Option 4', value: 'opt4', disabled: disableFinalOption }
            ]"
            label="Radio"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disableFinalOption"
            label="Disable final option"
        />
    </div>
</template>

<script setup lang="ts">
import IplRadio from '../../src/components/iplRadio.vue';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const selectedOption = ref(null);
const disableFinalOption = ref(true);
</script>
