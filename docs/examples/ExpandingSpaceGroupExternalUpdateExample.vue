<template>
    <!-- #region example -->
    <div class="alt-background">
        Active space: {{ activeSpace }}
        <ipl-expanding-space-group
            v-model="activeSpace"
            class="vertical-layout"
        >
            <ipl-expanding-space
                key="space1"
                title="First Space"
            >
                Space content!
            </ipl-expanding-space>
            <ipl-expanding-space
                key="space2"
                v-model:expanded="secondSpaceExpanded"
                title="Second Space"
            >
                Space content!
            </ipl-expanding-space>
            <ipl-expanding-space
                key="space3"
                title="Third Space"
            >
                Space content!
            </ipl-expanding-space>
        </ipl-expanding-space-group>
    </div>
    <div class="horizontal-layout">
        <ipl-button
            label="Expand first space"
            inline
            @click="activeSpace = 'space1'"
        />
        <ipl-button
            label="Toggle second space"
            inline
            @click="secondSpaceExpanded = !secondSpaceExpanded"
        />
    </div>
    <!-- #endregion example -->
</template>

<script setup lang="ts">
import IplExpandingSpace from '../../src/components/iplExpandingSpace.vue';
import IplExpandingSpaceGroup from '../../src/components/iplExpandingSpaceGroup.vue';
import { ref } from 'vue';
import IplButton from '../../src/components/iplButton.vue';

const activeSpace = ref<string | null>(null);
const secondSpaceExpanded = ref(false);
</script>
