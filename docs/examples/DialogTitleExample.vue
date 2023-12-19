<template>
    <event-log>
        <div class="resizable alt-background">
            <!-- #region example -->
            <ipl-dialog-title
                title="Dialog Title"
                :closing-disabled="disableClosing"
            />
            <!-- #endregion example -->
        </div>
        <template #extra>
            <div class="horizontal-layout">
                <ipl-checkbox
                    v-model="disableClosing"
                    label="Disable Closing"
                />
            </div>
        </template>
    </event-log>
</template>

<script lang="ts" setup>
import { IplDialogTitle, IplCheckbox } from '../../src';
import { ref } from 'vue';

const disableClosing = ref(false);
</script>
