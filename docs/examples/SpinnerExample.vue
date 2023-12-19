<template>
    <div class="horizontal-layout">
        <!-- #region example -->
        <ipl-spinner />
        <ipl-spinner
            :color="customColor"
            width="64px"
            size="2px"
        />
        <!-- #endregion example -->
    </div>
    <div class="width-capped-content">
        <ipl-input
            v-model="customColor"
            name="color"
            type="color"
            label="Color"
        />
    </div>
</template>

<script lang="ts" setup>
import { IplInput, IplSpinner } from '../../src';
import { ref } from 'vue';

const customColor = ref('#3382B8');
</script>
