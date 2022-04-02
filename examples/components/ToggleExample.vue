<template>
    <ipl-space>
        value: {{ toggleModelValue }}
        <ipl-toggle v-model="toggleModelValue" />
        <ipl-toggle
            v-model="customLabelToggleValue"
            true-label="Custom label"
            false-label="Works with overly long labels if you're into that sort of thing"
            class="top-margin"
        />
        <ipl-toggle
            v-model="neutralToggleValue"
            true-label="Neutral Colors"
            false-label="???"
            use-neutral-colors
            class="top-margin"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IplToggle, IplSpace } from '../../src/';
import { ref } from 'vue';

export default defineComponent({
    name: 'ToggleExample',

    components: { IplToggle, IplSpace },

    setup() {
        const toggleModelValue = ref(false);
        const customLabelToggleValue = ref(false);
        const neutralToggleValue = ref(false);

        return {
            toggleModelValue,
            customLabelToggleValue,
            neutralToggleValue
        };
    }
});
</script>
