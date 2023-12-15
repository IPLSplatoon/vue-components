<template>
    <div class="alt-background">
        <!-- #region example -->
        <ipl-expanding-space-group class="vertical-layout">
            <ipl-expanding-space
                key="space1"
                title="First Space"
            >
                Space content!
            </ipl-expanding-space>
            <ipl-expanding-space
                key="space2"
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
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import IplExpandingSpace from '../../src/components/iplExpandingSpace.vue';
import IplExpandingSpaceGroup from '../../src/components/iplExpandingSpaceGroup.vue';
</script>
