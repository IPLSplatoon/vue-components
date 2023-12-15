<template>
    <div class="vertical-layout width-capped-content">
        <div>Selected: {{ selectedOption }}</div>
        <!-- #region example -->
        <ipl-select
            v-model="selectedOption"
            :option-groups="[
                {
                    name: 'First Group',
                    options: [
                        { name: 'Option 1', value: 'opt1' },
                        { name: 'Option 2', value: 'opt2' }
                    ]
                },
                {
                    name: 'Second Group',
                    options: [
                        { name: 'Option 3', value: 'opt3' },
                        { name: 'Option 3', value: 'opt4' }
                    ]
                }
            ]"
            :disabled="disabled"
            label="Select"
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
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import IplSelect from '../../src/components/iplSelect.vue';

const selectedOption = ref(null);
const disabled = ref(false);
</script>
