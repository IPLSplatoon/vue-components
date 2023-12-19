<template>
    <div class="vertical-layout resizable width-capped-content">
        <!-- #region example -->
        <ipl-message type="info">
            Info Message
        </ipl-message>
        <ipl-message type="warning">
            Warning Message
        </ipl-message>
        <ipl-message type="error">
            Error Message
        </ipl-message>
        <!-- #endregion example -->
    </div>
</template>

<script setup lang="ts">
import IplMessage from '../../src/components/iplMessage.vue';
</script>
