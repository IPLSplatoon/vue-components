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

async function animationsComplete(element: HTMLElement): Promise<unknown> {
    return Promise.allSettled(element.getAnimations().map(animation => animation.finished));
}

export default defineComponent({
    name: 'IplSidebar',

    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },

    emits: ['update:isOpen'],

    setup(props, { emit }) {
        const dialog = ref<HTMLDialogElement | null>(null);

        async function onClose() {
            if (!dialog.value) return;
            dialog.value.setAttribute('inert', '');
            await animationsComplete(dialog.value);
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
                onClose();
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

dialog {
    border: none;
    background-color: var(--ipl-bg-primary);
    color: var(--ipl-body-text-color);
    width: 85%;
    height: 100%;
    max-height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    inset: 0;
    display: block;
    position: fixed;
    // Unfortunately, if you want animation, you'll have to put up with this.
    z-index: 999999;
    transform: translateX(-85vw);

    &:not([open]) {
        pointer-events: none;
    }

    &[open] {
        animation: slide-in constants.$transition-duration-med ease-out forwards;

        &::backdrop {
            animation: backdrop-fade-in constants.$transition-duration-med ease-out forwards;
        }

        &[inert] {
            animation: slide-out constants.$transition-duration-med ease-in forwards;

            &::backdrop {
                animation: backdrop-fade-out constants.$transition-duration-med ease-out forwards;
            }
        }
    }

    &::backdrop {
        background: var(--ipl-page-overlay-color);
    }

    > .content {
        padding: 8px;
        height: 100%;
    }

    &:focus-visible {
        outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
    }
}

@keyframes slide-in {
    to {
        transform: translateX(0vw);
    }
}

@keyframes slide-out {
    0% {
        transform: translateX(0vw);
    }

    100% {
        transform: translateX(-85vw);
    }
}

@keyframes backdrop-fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes backdrop-fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
