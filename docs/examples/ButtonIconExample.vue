<template>
    <div class="width-capped-content horizontal-layout">
        <!-- #region example -->
        <ipl-button
            icon="brush"
            :small="small"
        />
        <ipl-button
            icon="cog"
            color="orange"
            :small="small"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="small"
            label="Small"
        />
    </div>
</template>

<script setup lang="ts">
import { IplButton, IplCheckbox } from '../../src';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrush } from '@fortawesome/free-solid-svg-icons/faBrush';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { ref } from 'vue';

library.add(faBrush, faCog);

const small = ref(false);
</script>
