<template>
    <div class="width-capped-content vertical-layout">
        <!-- #region example -->
        <ipl-button
            label="Button"
            requires-confirmation
            :short-confirmation-message="shortConfirmationMessage"
            @click="onClick"
        />
        <!-- #endregion example -->
        <div
            v-if="showClickAlert"
            class="text-center"
        >
            Clicked!
        </div>
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="shortConfirmationMessage"
            label="Use shorter confirmation message"
        />
    </div>
</template>

<script setup lang="ts">
import IplButton from '../../src/components/iplButton.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import { ref } from 'vue';

const shortConfirmationMessage = ref(false);
const showClickAlert = ref(false);
let clickAlertTimeout = 0;

function onClick() {
    clearTimeout(clickAlertTimeout);
    showClickAlert.value = true;
    clickAlertTimeout = window.setTimeout(() => {
        showClickAlert.value = false;
    }, 2500);
}
</script>
