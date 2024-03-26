<template>
    <div class="width-capped-content vertical-layout">
        <!-- #region example -->
        <ipl-button
            :disabled="disabled"
            :small="small"
        >
            <font-awesome-icon
                icon="file"
                class="icon"
            />
            Custom Content
        </ipl-button>

        <ipl-button
            v-slot="{ state }"
            requires-confirmation
            :disabled="disabled"
            :small="small"
        >
            <font-awesome-icon
                icon="file"
                class="icon"
            />
            {{ state === 'confirm' ? 'Confirm?' : 'Requires Confirmation' }}
        </ipl-button>

        <ipl-button
            v-slot="{ state }"
            async
            :disabled="disabled"
            :small="small"
            @click="asyncSuccess"
        >
            <template v-if="state === 'idle'">
                Async
            </template>
            <template v-else-if="state === 'loading'">
                Working...
            </template>
            <template v-else-if="state === 'success'">
                Done!
            </template>
            <template v-else-if="state === 'error'">
                Error!
            </template>
        </ipl-button>
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
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faFile);

const disabled = ref(false);
const small = ref(false);

async function asyncSuccess() {
    return new Promise(resolve => {
        setTimeout(resolve, 2500);
    });
}
</script>
