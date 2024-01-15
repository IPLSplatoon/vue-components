<template>
    <div class="width-capped-content vertical-layout">
        <!-- #region example -->
        <ipl-button
            label="Button"
            :disabled="disabled"
            :small="small"
            color="transparent"
        />
        <ipl-button
            label="Async"
            :disabled="disabled"
            :small="small"
            async
            color="transparent"
            @click="asyncSuccess"
        />
        <ipl-button
            icon="flask"
            :disabled="disabled"
            :small="small"
            color="transparent"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
        <ipl-checkbox
            v-model="small"
            label="Small"
        />
    </div>
</template>

<script setup lang="ts">
import IplButton from '../../src/components/iplButton.vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlask } from '@fortawesome/free-solid-svg-icons/faFlask';

library.add(faFlask);

const disabled = ref(false);
const small = ref(false);
async function asyncSuccess() {
    return new Promise(resolve => {
        setTimeout(resolve, 2500);
    });
}
</script>
