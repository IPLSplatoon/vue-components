<template>
    <dialog
        ref="dialog"
        @close="onClose"
        @cancel.prevent="onCancel"
        @click.self="onClick"
    >
        <div class="content">
            <slot />
        </div>
    </dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { dialogAnimationComplete } from '../helpers/dialogHelper';

export default defineComponent({
    name: 'IplSidebar',

    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        persistent: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:isOpen'],

    setup(props, { emit }) {
        const dialog = ref<HTMLDialogElement | null>(null);

        async function onClose() {
            if (!dialog.value) return;
            dialog.value.setAttribute('inert', '');
            await dialogAnimationComplete(dialog.value);
            dialog.value.close();
        }

        onMounted(() => {
            if (!props.isOpen) {
                dialog.value?.setAttribute('inert', '');
            } else {
                dialog.value?.showModal();
            }

            watch(() => props.isOpen, newValue => {
                if (newValue) {
                    dialog.value?.removeAttribute('inert');
                    dialog.value?.showModal();
                } else {
                    onClose();
                }
            });
        });

        return {
            dialog,
            onClose() {
                emit('update:isOpen', false);
            },
            onCancel() {
                onClose();
            },
            onClick() {
                if (!props.persistent) {
                    onClose();
                }
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';
@use 'src/styles/dialogs';

dialog {
    @include dialogs.dialog-common;

    transform: translateX(-85vw);
    width: 85%;
    height: 100%;

    &:not([open]) {
        opacity: 0;
    }
}

@include dialogs.dialog-common-animation;

@keyframes dialog-enter {
    to {
        transform: translateX(0vw);
    }
}

@keyframes dialog-exit {
    0% {
        transform: translateX(0vw);
    }

    100% {
        transform: translateX(-85vw);
    }
}
</style>
