<template>
    <ipl-space>
        <ipl-progress-bar
            :value="progressBarValue"
            :color="progressBarColor"
        />
        <ipl-button
            class="top-margin"
            label="Set random value"
            @click="setProgressBarValue"
        />
        <ipl-button
            class="top-margin"
            label="Set color"
            @click="setProgressBarColor"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import IplSpace from '../../src/components/iplSpace.vue';
import IplProgressBar from '../../src/components/iplProgressBar.vue';
import { ref } from 'vue';
import IplButton from '../../src/components/iplButton.vue';
import random from 'lodash/random';
import { getRandomColor } from '../helpers';

export default defineComponent({
    name: 'ProgressBarExample',

    components: { IplButton, IplProgressBar, IplSpace },

    setup() {
        const progressBarValue = ref(0);
        const progressBarColor = ref('blue');

        return {
            progressBarValue,
            progressBarColor,
            setProgressBarValue() {
                progressBarValue.value = random(0, 100);
            },
            setProgressBarColor() {
                progressBarColor.value = getRandomColor();
            }
        };
    }
});
</script>
