<template>
    <div class="vertical-layout alt-background">
        <!-- #region example -->
        <ipl-expanding-space title="Expanding Space">
            Space content!
        </ipl-expanding-space>
        <ipl-expanding-space title="Extra content in header">
            <template #header-extra>
                <ipl-button label="button" />
            </template>
            Space content!
        </ipl-expanding-space>
        <ipl-expanding-space>
            <template #title>
                Space Title <i>from slots</i>
            </template>
            Space content!
        </ipl-expanding-space>
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplExpandingSpace, IplButton } from '../../src';
</script>
