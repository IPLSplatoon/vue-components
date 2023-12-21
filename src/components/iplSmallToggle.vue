<template>
    <label
        class="ipl-small-toggle__wrapper"
        :class="{ disabled: disabled, active: modelValue }"
    >
        {{ label }}
        <input
            v-model="model"
            type="checkbox"
            role="switch"
            :disabled="disabled"
        >
    </label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'IplSmallToggle',

    props: {
        label: {
            type: String,
            required: true
        },
        modelValue: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        const model = computed<boolean>({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            }
        });
        return {
            model,
            toggleValue() {
                if (!props.disabled) {
                    model.value = !model.value;
                }
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/colors';
@use 'src/styles/constants';

html.light .ipl-small-toggle__wrapper {
    --ipl-toggle-button-color: #fff;
    --ipl-toggle-box-shadow-color: rgba(22, 22, 22, 0.1)
}

.ipl-small-toggle__wrapper {
    --ipl-toggle-button-color: #eee;
    --ipl-toggle-box-shadow-color: rgba(22, 22, 22, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    overflow-wrap: anywhere;
    word-break: break-all;
    color: var(--ipl-body-text-color);
    border-radius: constants.$border-radius-inner;
    padding: 2px 4px;
    transition: background-color constants.$transition-duration-low;

    &:not(.disabled) {
        &.active > input {
            background-color: colors.$green;
        }

        &.active:hover > input {
            background-color: colors.$green-hover;
        }

        &.active:active > input {
            background-color: colors.$green-active;
        }

        &:hover {
            background-color: var(--ipl-hover-overlay-color);

            > input {
                background-color: var(--ipl-bg-tertiary-hover);
            }
        }

        &:active {
            background-color: var(--ipl-active-overlay-color);

            > input {
                background-color: var(--ipl-bg-tertiary-active);
            }
        }
    }

    &.disabled {
        filter: brightness(0.75) contrast(0.9);
        color: var(--ipl-disabled-body-text-color);
    }

    > input {
        appearance: none;
        min-width: 50px;
        height: 28px;
        background-color: var(--ipl-bg-tertiary);
        border-radius: 9999px;
        transition-property: background-color;
        transition-duration: constants.$transition-duration-med;
        margin: 0 0 0 8px;
        box-shadow: inset 1px 1px 2px var(--ipl-toggle-box-shadow-color);

        &:checked:before {
            transform: translateX(100%);
        }

        &:before {
            content: '';
            display: block;
            height: 22px;
            width: 22px;
            background-color: var(--ipl-toggle-button-color);
            border-radius: 9999px;
            margin: 3px;
            transition-property: transform;
            transition-duration: constants.$transition-duration-med;
            filter: drop-shadow(0 0 1px rgba(22, 22, 22, 0.5));
        }

        &:focus-visible {
            outline-offset: 0;
            outline: var(--ipl-focus-outline-color) solid 2px;
        }
    }
}
</style>
