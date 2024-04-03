<template>
    <div class="width-capped-content vertical-layout resizable">
        <div>Value: {{ value }}</div>
        <!-- #region example -->
        <ipl-small-toggle
            v-model="value"
            label="Small Toggle"
            :disabled="disabled"
        />
        <ipl-small-toggle
            v-model="value"
            :disabled="disabled"
        >
            Label from slot<br>
            <ipl-label>Extra line of text</ipl-label>
        </ipl-small-toggle>
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
import { IplSmallToggle, IplCheckbox } from '../../src';
import { ref } from 'vue';
import IplLabel from '../../src/components/iplLabel.vue';

const value = ref(false);
const disabled = ref(false);
</script>
