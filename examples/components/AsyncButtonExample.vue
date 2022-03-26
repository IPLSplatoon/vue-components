<template>
    <ipl-space>
        <ipl-button
            label="Success state"
            async
            success-message="Done!"
            progress-message="In progress..."
            @click="asyncSuccess"
        />
        <ipl-button
            label="Failure state"
            async
            progress-message="Doing something..."
            class="top-margin"
            @click="asyncFailure"
        />
    </ipl-space>
</template>

<script lang="ts">
import { IplButton, IplSpace } from '../../src/';
import { defineComponent } from '@vue/runtime-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrush } from '@fortawesome/free-solid-svg-icons/faBrush';

library.add(faBrush);

export default defineComponent({
    name: 'AsyncButtonExample',

    components: { IplButton, IplSpace },

    setup() {

        return {
            async asyncSuccess() {
                return new Promise(resolve => {
                    setTimeout(resolve, 2500);
                });
            },
            async asyncFailure() {
                return new Promise((resolve, reject) => {
                    setTimeout(reject, 2500);
                });
            }
        };
    }
});
</script>
