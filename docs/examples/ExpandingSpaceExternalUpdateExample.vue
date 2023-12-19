<template>
    <div class="vertical-layout alt-background">
        <!-- #region example -->
        <ipl-expanding-space
            v-model:expanded="expanded"
            title="Expanding Space"
        >
            Space content!
        </ipl-expanding-space>
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="expanded"
            label="Expanded"
        />
    </div>
</template>

<script setup lang="ts">
import IplExpandingSpace from '../../src/components/iplExpandingSpace.vue';
import { ref } from 'vue';
import IplCheckbox from '../../src/components/iplCheckbox.vue';

const expanded = ref(true);
</script>
