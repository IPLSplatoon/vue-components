<template>
    <div
        class="ipl-small-toggle__wrapper"
        :class="{ disabled: disabled, active: modelValue }"
        @click="toggleValue"
    >
        {{ label }}
        <div class="value-display">
            <div class="circle" />
        </div>
    </div>
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
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-small-toggle__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    overflow-wrap: anywhere;
    word-break: break-all;

    &:not(.disabled) {
        cursor: pointer;

        &.active > .value-display {
            background-color: $green;
        }

        &.active:hover > .value-display {
            background-color: $green-hover;
        }

        &.active:active > .value-display {
            background-color: $green-active;
        }

        &:hover > .value-display {
            background-color: $background-tertiary-hover;
        }

        &:active > .value-display {
            background-color: $background-tertiary-active;
        }
    }

    &.disabled {
        filter: brightness(0.75) contrast(0.9);
    }

    &.active > .value-display > .circle {
        transform: translateX(100%);
    }

    > .value-display {
        min-width: 50px;
        height: 28px;
        background-color: $background-tertiary;
        border-radius: 9999px;
        transition-duration: $transition-duration-med;
        margin-left: 8px;
        box-shadow: inset 1px 1px 2px rgba(22, 22, 22, 0.5);

        > .circle {
            height: 22px;
            width: 22px;
            background-color: #eee;
            border-radius: 9999px;
            margin: 3px;
            transition-duration: $transition-duration-med;
            filter: drop-shadow(0 0 1px rgba(22, 22, 22, 0.5));
        }
    }
}
</style>
