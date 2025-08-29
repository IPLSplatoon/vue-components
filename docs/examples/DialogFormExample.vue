<template>
    <div
        style="position: relative; overflow: hidden; min-height: 150px"
        class="sidebar-example-layout"
    >
        <!-- #region example -->
        <!--
           Without this form element, the form wouldn't get submitted
           when the enter key is pressed.

           Remove the @submit.prevent listener and the dialog can act
           as a regular HTML form, sending out its contents as a GET/POST
           request when submitted.
        -->
        <form @submit.prevent>
            <ipl-dialog
                v-model:is-open="dialogOpen"
                style="width: 400px"
            >
                <template #header>
                    <ipl-dialog-title
                        title="Form Dialog"
                        @close="dialogOpen = false"
                    />
                </template>
                <ipl-space
                    color="light"
                    class="vertical-layout"
                >
                    <ipl-input
                        v-model="name"
                        name="name"
                        label="Name"
                    />
                    <ipl-input
                        v-model="timeRemaining"
                        name="timeRemaining"
                        label="Time remaining"
                        extra="seconds"
                        type="number"
                    />
                    <ipl-small-toggle
                        label="Everything will be okay"
                    />
                    <ipl-button>
                        A button
                    </ipl-button>
                </ipl-space>
                <template #footer>
                    <ipl-button
                        type="submit"
                        label="Submit"
                        color="green"
                        @click="onSubmit"
                    />
                </template>
            </ipl-dialog>
        </form>
        <!-- #endregion example -->
        <ipl-button
            label="Open dialog (Form)"
            @click="dialogOpen = true"
        />
        <div v-if="submitted">The form was submitted!</div>
    </div>
</template>

<script setup lang="ts">
import { IplButton, IplSpace, IplDialog, IplDialogTitle, IplInput, IplSmallToggle } from '../../src';
import { ref } from 'vue';

const dialogOpen = ref(false);
const submitted = ref(false);
const name = ref('');
const timeRemaining = ref(937);
let formSubmitResetTimeout: number | undefined = undefined;

function onSubmit() {
    dialogOpen.value = false;
    submitted.value = true;
    window.clearTimeout(formSubmitResetTimeout);
    formSubmitResetTimeout = window.setTimeout(() => {
        submitted.value = false;
    }, 5000);
}
</script>

<style lang="scss">
.sidebar-example-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > .ipl-button {
        width: auto;
    }

    > div {
        margin-top: 8px;
    }
}
</style>
