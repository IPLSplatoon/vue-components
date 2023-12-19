<template>
    <div class="width-capped-content vertical-layout">
        <div>Value: {{ value }}</div>
        <!-- #region example -->
        <ipl-toggle
            v-model="value"
            :use-neutral-colors="useNeutralColors"
            true-label="True!"
            false-label="False! (Filler text to force this option to wrap onto multiple lines :))"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="useNeutralColors"
            label="Use neutral colors"
        />
    </div>
</template>

<script setup lang="ts">
import { IplToggle, IplCheckbox } from '../../src';
import { ref } from 'vue';

const value = ref(false);
const useNeutralColors = ref(false);
</script>
