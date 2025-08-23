<template>
    <dialog
        ref="dialog"
        @close="onClose"
        @cancel.prevent="onCancel"
        @click.self="onClick"
    >
        <div class="header">
            <slot name="header" />
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="footer">
            <slot name="footer" />
        </div>
    </dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { dialogAnimationComplete } from '../helpers/dialogHelper';

export default defineComponent({
    name: 'IplDialog',

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
            dialog.value.close('dismiss');
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
    @include dialogs.dialog-common(constants.$transition-duration-low, constants.$transition-duration-med, constants.$transition-duration-low, linear, linear);

    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: constants.$border-radius-outer;
    max-height: calc(100dvh - 16px);
}

// Touchscreen devices tend to have random UI elements loitering around the bottom of the screen
// (e.g. the little bar you swipe up from to return to the home screen; I don't know what it's called.
// I can see it on my iPad and my Pixel, so it isn't unique to one operating system.)
// This media query addresses that by adding more empty space below dialogs on touchscreens.
@media (pointer: coarse) {
    dialog {
        max-height: calc(100dvh - 32px);
        top: calc(50% - 8px);
    }
}

@include dialogs.dialog-common-animation;

@keyframes dialog-enter {
    to {
        opacity: 1;
    }
}

@keyframes dialog-exit {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
