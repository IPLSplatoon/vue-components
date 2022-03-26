<template>
    <div>
        <ipl-expanding-space title="Expanding Space">
            Hello!
        </ipl-expanding-space>
        <ipl-expanding-space class="top-margin">
            <template #title>
                <i>Title from Props</i>
            </template>
            Hello!
        </ipl-expanding-space>
        <ipl-button
            class="top-margin"
            label="Toggle"
            @click="showExpandByPropsExample = !showExpandByPropsExample"
        />
        <ipl-expanding-space
            v-model:expanded="showExpandByPropsExample"
            title="Set expanded property externally"
            class="top-margin"
        >
            Hello?
        </ipl-expanding-space>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IplExpandingSpace, IplButton } from '../../src/';
import { ref } from 'vue';

export default defineComponent({
    name: 'ExpandingSpaceExample',

    components: { IplButton, IplExpandingSpace },

    setup() {
        const showExpandByPropsExample = ref(true);

        return {
            showExpandByPropsExample
        };
    }
});
</script>
