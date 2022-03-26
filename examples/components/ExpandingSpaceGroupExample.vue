<template>
    <div>
        Selected space: {{ selectedSpace }}
        <ipl-expanding-space-group
            v-model="selectedSpace"
            class="top-margin"
        >
            <ipl-expanding-space
                key="space1"
                v-model:expanded="firstSpaceExpanded"
                :title="`Space One (expanded: ${firstSpaceExpanded})`"
            >
                First Space
            </ipl-expanding-space>
            <ipl-expanding-space
                key="space2"
                v-model:expanded="secondSpaceExpanded"
                :title="`Space Two (expanded: ${secondSpaceExpanded})`"
                class="top-margin"
            >
                Second Space
            </ipl-expanding-space>
            <ipl-expanding-space
                key="space3"
                v-model:expanded="thirdSpaceExpanded"
                :title="`Space Three (expanded: ${thirdSpaceExpanded})`"
                class="top-margin"
            >
                Third Space
            </ipl-expanding-space>
        </ipl-expanding-space-group>
        <ipl-button
            label="Toggle second space"
            class="top-margin"
            @click="secondSpaceExpanded = !secondSpaceExpanded"
        />
        <ipl-button
            label="Select third space"
            class="top-margin"
            @click="selectedSpace = 'space3'"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IplExpandingSpaceGroup, IplExpandingSpace, IplButton } from '../../src/';
import { ref } from 'vue';

export default defineComponent({
    name: 'ExpandingSpaceGroupExample',

    components: { IplExpandingSpace, IplExpandingSpaceGroup, IplButton },

    setup() {
        const selectedSpace = ref<string | null>(null);
        const firstSpaceExpanded = ref(false);
        const secondSpaceExpanded = ref(false);
        const thirdSpaceExpanded = ref(false);

        return {
            firstSpaceExpanded,
            secondSpaceExpanded,
            thirdSpaceExpanded,
            selectedSpace
        };
    }
});
</script>
