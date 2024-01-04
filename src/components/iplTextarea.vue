<template>
    <div
        class="ipl-textarea__wrapper"
        :class="{ 'has-error': validator?.isValid === false }"
    >
        <ipl-label>
            {{ props.label }}
            <textarea
                v-model="model"
                :name="props.name"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
            />
        </ipl-label>
        <span
            v-if="validator?.isValid === false"
            class="error"
        >
            {{ validator?.message }}
        </span>
    </div>
</template>

<script setup lang="ts">
import IplLabel from './iplLabel.vue';
import { computed } from 'vue';
import { useValidator } from '../validation/useValidator';

const props = withDefaults(defineProps<{
    modelValue: string | null
    name: string
    label?: string
    disabled?: boolean
    placeholder?: string
}>(), {
    label: '',
    disabled: false,
    placeholder: ''
});

const emit = defineEmits<{
    'update:modelValue': [newValue: string | null]
}>();

const model = computed({
    get() {
        return props.modelValue ?? '';
    },
    set(value: string) {
        emit('update:modelValue', value);
    }
});

const validator = useValidator(() => props.name, model);
</script>

<style scoped lang="scss">
@use 'src/styles/constants';

.ipl-textarea__wrapper {
    transition: border-color constants.$transition-duration-low;

    &:focus-within {
        border-color: var(--ipl-input-color-active);
    }

    &.has-error {
        textarea {
            border-color: var(--ipl-input-error-color);
        }

        label {
            color: var(--ipl-input-error-color);
        }
    }
}

label {
    transition: color constants.$transition-duration-low;

    &:focus-within {
        color: var(--ipl-input-color-active);
    }
}

textarea {
    display: block;
    resize: vertical;
    width: 100%;
    background: transparent;
    color: var(--ipl-body-text-color);
    font-family: constants.$body-font;
    font-size: 1.4em;
    min-height: 1.4em;
    margin: 2px 0;
    border-color: var(--ipl-input-color);
    border-width: 0 0 1px 0;
    border-style: solid;

    &:disabled {
        color: var(--ipl-disabled-body-text-color);
    }

    &::placeholder {
        color: var(--ipl-input-color-placeholder);
        opacity: 100%;
    }
}

.error {
    color: var(--ipl-input-error-color);
    font-size: 0.75em;
}
</style>
