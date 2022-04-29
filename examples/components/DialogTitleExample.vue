<template>
    <div>
        <ipl-dialog-title
            title="Dialog Title"
            @close="onClose"
        />
        <ipl-dialog-title
            title="Dialog Title (Closing disabled)"
            closing-disabled
            class="top-margin"
            @close="onClose"
        />
    </div>
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
