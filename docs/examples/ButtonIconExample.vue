<template>
    <div class="width-capped-content horizontal-layout">
        <!-- #region example -->
        <ipl-button
            icon="brush"
        />
        <ipl-button
            icon="cog"
            color="orange"
        />
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import { IplButton } from '../../src';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrush } from '@fortawesome/free-solid-svg-icons/faBrush';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

library.add(faBrush, faCog);
</script>
