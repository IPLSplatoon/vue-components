<template>
    <event-log>
        <div class="resizable gray-background vertical-layout">
            <!-- #region example -->
            <ipl-dialog-title
                color="secondary"
            >
                <i>Cool Dialog Title</i>
                <template #end>
                    <ipl-button>
                        <font-awesome-icon
                            icon="rotate"
                            class="icon"
                        />
                        Rotate!
                    </ipl-button>
                    <ipl-button
                        small
                        icon="question"
                        color="transparent"
                    />
                </template>
            </ipl-dialog-title>
            <!-- #endregion example -->
        </div>
    </event-log>
</template>

<script lang="ts" setup>
import { IplDialogTitle, IplButton } from '../../src';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';

library.add(faRotate, faQuestion);
</script>
