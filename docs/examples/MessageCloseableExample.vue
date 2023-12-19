<template>
    <event-log>
        <div class="vertical-layout resizable width-capped-content">
            <!-- #region example -->
            <ipl-message
                type="info"
                closeable
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </ipl-message>
            <!-- #endregion example -->
        </div>
    </event-log>
</template>

<script setup lang="ts">
import IplMessage from '../../src/components/iplMessage.vue';
</script>
