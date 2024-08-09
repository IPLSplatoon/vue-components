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
            <small>Extra line of text</small>
        </ipl-small-toggle>
        <div>
            <ipl-small-toggle
                v-model="value"
                :disabled="disabled"
            />
        </div>
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

const value = ref(false);
const disabled = ref(false);
</script>
