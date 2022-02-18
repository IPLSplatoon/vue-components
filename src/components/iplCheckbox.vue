<template>
    <label :class="{ checked: model, small: small, disabled: disabled }">
        <input
            v-model="model"
            type="checkbox"
            :disabled="disabled"
        >
        {{ label }}
    </label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'IplCheckbox',

    props: {
        label: {
            type: String,
            required: true
        },
        modelValue: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        return {
            model: computed<boolean>({
                get() {
                    return props.modelValue;
                },
                set(value) {
                    emit('update:modelValue', value);
                }
            })
        };
    }
});
</script>

<style lang="scss" scoped>
@import './src/styles/colors';
@import './src/styles/constants';

label {
    display: flex;
    align-items: center;
    font-size: 1em;
    position: relative;
    user-select: none;
    cursor: pointer;
    transition-duration: $transition-duration-low;
    outline-width: 0;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        border-radius: $border-radius-inner;
        background-color: $background-tertiary;
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: center center;
    }

    &.small {
        font-size: 0.75em;

        input {
            margin-left: 3px;
            margin-right: 5px;
        }

        &:before {
            width: 16px;
            height: 16px;
            background-size: 14px;
        }
    }

    &.disabled {
        color: $text-color-disabled;
        cursor: default;

        input {
            cursor: default;
        }
    }

    &:not(.disabled) {
        &:hover:before {
            background-color: $background-tertiary-hover;
        }

        &:active:before {
            background-color: $background-tertiary-active;
        }
    }

    &.checked:before {
        // check from font-awesome: https://fontawesome.com/v5.15/icons/check
        background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%2300A651%22%20d%3D%22M173.898%20439.404l-166.4-166.4c-9.997-9.997-9.997-26.206%200-36.204l36.203-36.204c9.997-9.998%2026.207-9.998%2036.204%200L192%20312.69%20432.095%2072.596c9.997-9.997%2026.207-9.997%2036.204%200l36.203%2036.204c9.997%209.997%209.997%2026.206%200%2036.204l-294.4%20294.401c-9.998%209.997-26.207%209.997-36.204-.001z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
    }

    input {
        margin-left: 5px;
        margin-right: 10px;
        opacity: 0;
        cursor: pointer;
    }
}
</style>