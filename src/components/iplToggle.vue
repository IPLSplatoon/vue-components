<template>
    <div
        class="ipl-toggle__container"
        role="switch"
        tabindex="0"
        @click="toggleValue"
        @keydown.space.prevent
        @keyup.space="toggleValue"
    >
        <div class="ipl-toggle__text">
            <span
                class="true-option"
                :class="{ selected: model }"
            >
                {{ trueLabel }}
            </span>
            <span
                class="false-option"
                :class="{ selected: !model }"
            >
                {{ falseLabel }}
            </span>
        </div>
        <div
            class="ipl-toggle__button"
            :class="{ 'is-true': model, 'color-neutral': useNeutralColors }"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'IplToggle',

    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        trueLabel: {
            type: String,
            default: 'Show'
        },
        falseLabel: {
            type: String,
            default: 'Hide'
        },
        useNeutralColors: {
            type: Boolean,
            default: false
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        const model = computed({
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
                model.value = !model.value;
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/colors';
@use 'src/styles/constants';

.ipl-toggle__container {
    min-height: 44px;
    background-color: var(--ipl-bg-tertiary);
    border-radius: constants.$border-radius-inner;
    position: relative;
    transition-duration: constants.$transition-duration-low;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &:focus-visible {
        outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
    }

    &:hover {
        background-color: var(--ipl-bg-tertiary-hover);

        .ipl-toggle__button {
            background-color: colors.$red-hover;

            &.is-true {
                background-color: colors.$green-hover;
            }

            &.color-neutral {
                background-color: colors.$blue-hover;
            }
        }
    }

    &:active {
        background-color: var(--ipl-bg-tertiary-active);

        .ipl-toggle__button {
            background-color: colors.$red-active;

            &.is-true {
                background-color: colors.$green-active;
            }

            &.color-neutral {
                background-color: colors.$blue-active;
            }
        }
    }

    .ipl-toggle__text {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        align-items: center;
        justify-items: center;
        z-index: 2;
        text-transform: uppercase;
        font-size: 1em;
        font-weight: 700;
        user-select: none;
        margin: 4px;
        gap: 8px;

        span {
            color: var(--ipl-disabled-body-text-color);
            transition-duration: constants.$transition-duration-med;
            text-align: center;
            overflow-wrap: break-word;
            word-break: break-all;

            &.selected {
                color: #FFFFFF;
            }
        }
    }

    .ipl-toggle__button {
        position: absolute;
        height: calc(100% - 4px);
        width: calc(50% - 4px);
        background-color: colors.$red;
        left: calc(50% + 2px);
        top: 2px;
        border-radius: constants.$border-radius-inner;
        z-index: 1;
        transition-duration: constants.$transition-duration-med;

        &.is-true {
            // Fixes oddities with Safari on iOS
            left: calc(0% + 2px);
            background-color: colors.$green;
        }

        &.color-neutral {
            background-color: colors.$blue;
        }
    }
}
</style>
