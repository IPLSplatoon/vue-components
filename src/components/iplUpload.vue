<template>
    <label
        class="ipl-upload"
        :class="{ active: isDraggedOver }"
        @dragenter="setDraggedOver(true)"
        @dragleave.self="setDraggedOver(false)"
        @drop="handleDrop"
    >
        <span v-if="!modelValue">
            Drag a file here or<br>
            click to browse...
        </span>
        <template v-else>
            <font-awesome-icon
                icon="file"
                class="icon"
            />
            <span>{{ modelValue.name }}</span>
        </template>
        <input
            type="file"
            @change="onFileChange"
        >
    </label>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { defineComponent, PropType, ref } from 'vue';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';

library.add(faFile);

export default defineComponent({
    name: 'IplUpload',

    components: { FontAwesomeIcon },

    props: {
        modelValue: {
            type: [File, null] as PropType<File | null>,
            required: true
        }
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const isDraggedOver = ref(false);

        const setDraggedOver = (value: boolean) => {
            isDraggedOver.value = value;
        };

        return {
            setDraggedOver,
            isDraggedOver,
            onFileChange(event: Event) {
                const file = ((event.target as HTMLInputElement).files ?? [])[0];
                if (file) {
                    emit('update:modelValue', file);
                }
            },
            handleDrop(event: DragEvent) {
                setDraggedOver(false);
                const dataTransferItems = event.dataTransfer?.items ?? [];
                for (let i = 0; i < dataTransferItems.length; i++) {
                    const item = dataTransferItems[i];
                    if (item.kind === 'file') {
                        emit('update:modelValue', item.getAsFile());
                        break;
                    }
                }
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: constants.$border-radius-inner;
    padding: 8px 16px;
    min-height: 50px;
    transition-property: background-color;
    transition-duration: constants.$transition-duration-low;
    background-color: var(--ipl-bg-tertiary);
    position: relative;

    span {
        pointer-events: none;
        user-select: none;
        margin: 0;
        overflow-wrap: anywhere;
    }

    .icon {
        margin-right: 8px;
        font-size: 2em;
    }

    &.active {
        background-color: var(--ipl-bg-tertiary-active);
    }

    &:hover {
        background-color: var(--ipl-bg-tertiary-hover);
    }

    &:active {
        background-color: var(--ipl-bg-tertiary-active);
    }
}

input {
    position: absolute;
    width: 100%;
    height: 100%;
    color: transparent;
    border-radius: constants.$border-radius-inner;
    pointer-events: none;

    &::file-selector-button {
        display: none;
    }

    &:focus-visible {
        outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
    }
}
</style>
