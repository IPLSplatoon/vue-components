<template>
    <ipl-space>
        selected option: {{ selectedOption }}
        <ipl-radio
            v-model="selectedOption"
            label="Radio"
            :options="options"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import IplSpace from '../../src/components/iplSpace.vue';
import IplRadio from '../../src/components/iplRadio.vue';
import { ref } from 'vue';

export default defineComponent({
    name: 'RadioExample',

    components: { IplRadio, IplSpace },

    setup() {
        return {
            selectedOption: ref(null),
            options: [
                { name: 'Option 1', value: 'opt1' },
                { name: 'Option 2', value: 'opt2' },
                { name: 'Option 3', value: 'opt3' },
                { name: 'Option 4 (disabled)', value: 'opt4', disabled: true }
            ]
        };
    }
});
</script>
