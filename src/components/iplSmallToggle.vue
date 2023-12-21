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

    &:not(.disabled) {
        cursor: pointer;

        &.active > .value-display {
            background-color: colors.$green;
        }

        &.active:hover > .value-display {
            background-color: colors.$green-hover;
        }

        &.active:active > .value-display {
            background-color: colors.$green-active;
        }

        &:hover > .value-display {
            background-color: var(--ipl-bg-tertiary-hover);
        }

        &:active > .value-display {
            background-color: var(--ipl-bg-tertiary-active);
        }
    }

    &.disabled {
        filter: brightness(0.75) contrast(0.9);
        color: var(--ipl-disabled-body-text-color);
    }

    &.active > .value-display > .circle {
        transform: translateX(100%);
    }

    > .value-display {
        min-width: 50px;
        height: 28px;
        background-color: var(--ipl-bg-tertiary);
        border-radius: 9999px;
        transition-duration: constants.$transition-duration-med;
        margin-left: 8px;
        box-shadow: inset 1px 1px 2px var(--ipl-toggle-box-shadow-color);

        > .circle {
            height: 22px;
            width: 22px;
            background-color: var(--ipl-toggle-button-color);
            border-radius: 9999px;
            margin: 3px;
            transition-duration: constants.$transition-duration-med;
            filter: drop-shadow(0 0 1px rgba(22, 22, 22, 0.5));
        }
    }
}
</style>
