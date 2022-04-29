<template>
    <ipl-space>
        <ipl-message type="info">
            An informational message.
        </ipl-message>
        <ipl-message
            type="info"
            closeable
            class="top-margin"
            @close="closeMessage"
        >
            I can be closed. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </ipl-message>
        <ipl-message
            type="warning"
            class="top-margin"
        >
            A warning!
        </ipl-message>
        <ipl-message
            type="error"
            class="top-margin"
        >
            An error message!
        </ipl-message>
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import IplSpace from '../../src/components/iplSpace.vue';
import IplMessage from '../../src/components/iplMessage.vue';

export default defineComponent({
    name: 'MessageExample',

    components: { IplMessage, IplSpace },

    setup() {
        return {
            closeMessage() {
                alert('I have been closed!');
            }
        };
    }
});
</script>
