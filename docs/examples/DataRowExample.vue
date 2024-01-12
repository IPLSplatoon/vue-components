<template>
    <div class="resizable">
        <!-- #region example -->
        <ipl-data-row
            :label="label"
            :value="value"
            :copiable="copiable"
        />
        <!-- #endregion example -->
    </div>
    <div class="vertical-layout width-capped-content">
        <ipl-input
            v-model="label"
            name="label"
            label="Label"
        />
        <ipl-input
            v-model="value"
            name="value"
            label="Value"
        />
        <ipl-checkbox
            v-model="copiable"
            label="Copiable"
        />
    </div>
</template>

<script setup lang="ts">
import IplDataRow from '../../src/components/iplDataRow.vue';
import { ref } from 'vue';
import IplInput from '../../src/components/iplInput.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const label = ref('Data Row');
const value = ref('text content');
const copiable = ref(false);
</script>
