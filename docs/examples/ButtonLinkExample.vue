<template>
    <div class="horizontal-layout no-wrap">
        <!-- #region example -->
        <ipl-button
            label="Link"
            href="https://iplabs.ink"
            :disabled="disabled"
            :requires-confirmation="requireConfirmation"
            :small="small"
        />
        <ipl-button
            icon="link"
            href="https://iplabs.ink"
            :disabled="disabled"
            :requires-confirmation="requireConfirmation"
            :small="small"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
        <ipl-checkbox
            v-model="requireConfirmation"
            label="Require confirmation"
        />
        <ipl-checkbox
            v-model="small"
            label="Small"
        />
    </div>
</template>

<script setup lang="ts">
import { IplButton, IplCheckbox } from '../../src';
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

library.add(faLink);

const disabled = ref(false);
const requireConfirmation = ref(false);
const small = ref(false);
</script>
