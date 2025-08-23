<template>
    <dialog
        ref="dialog"
        :class="[`anchor-x-${anchorX}`, `anchor-y-${anchorY}`]"
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
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
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
        },
        anchorY: {
            type: String as PropType<'start' | 'center' | 'end'>,
            default: 'center'
        },
        anchorX: {
            type: String as PropType<'start' | 'center' | 'end'>,
            default: 'center'
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
    border-radius: constants.$border-radius-outer;
    max-height: calc(100dvh - 16px);

    // I don't really like it, but it works!
    &.anchor-x-start {
        left: 8px;
    }

    &.anchor-x-center {
        left: 50%;

        &.anchor-y-start {
            transform: translateX(-50%);
        }

        &.anchor-y-center {
            transform: translate(-50%, -50%);
        }

        &.anchor-y-end {
            transform: translate(-50%, -100%);
        }
    }

    &.anchor-x-end {
        left: calc(100% - 8px);

        &.anchor-y-start {
            transform: translateX(-100%);
        }

        &.anchor-y-center {
            transform: translate(-100%, -50%);
        }

        &.anchor-y-end {
            transform: translate(-100%, -100%);
        }
    }

    &.anchor-y-start {
        top: 8px;
    }

    &.anchor-y-center {
        top: 50%;

        &.anchor-x-start {
            transform: translateY(-50%);
        }
    }

    &.anchor-y-end {
        top: calc(100% - 8px);

        &.anchor-x-start {
            transform: translateY(-100%);
        }
    }
}

// Touchscreen devices tend to have random UI elements loitering around the bottom of the screen
// (e.g. the little bar you swipe up from to return to the home screen; I don't know what it's called.
// I can see it on my iPad and my Pixel, so it isn't unique to one operating system.)
// This media query addresses that by adding more empty space below dialogs on touchscreens.
@media (pointer: coarse) {
    dialog {
        max-height: calc(100dvh - 32px);

        &.anchor-y-end {
            top: calc(100% - 24px);
        }

        &.anchor-y-center {
            top: calc(50% - 8px);
        }
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
