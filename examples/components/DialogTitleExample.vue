<template>
    <ipl-dialog-title
        title="Dialog Title"
        @close="onClose"
    />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IplDialogTitle } from '../../src';

export default defineComponent({
    name: 'DialogTitleExample',

    components: { IplDialogTitle },

    setup() {
        return {
            onClose() {
                alert('Closed!');
            }
        };
    }
});
</script>
