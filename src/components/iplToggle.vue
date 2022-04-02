<template>
    <div
        class="ipl-toggle__container"
        @click="toggleValue"
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
    @import './src/styles/colors';
    @import './src/styles/constants';
    @import './src/styles/constants';

    .ipl-toggle__container {
        min-height: 44px;
        background-color: $background-tertiary;
        border-radius: $border-radius-inner;
        position: relative;
        cursor: pointer;
        transition-duration: $transition-duration-low;
        display: flex;
        flex-direction: row;
        justify-content: center;

        &:hover {
            background-color: $background-tertiary-hover;

            .ipl-toggle__button {
                background-color: $red-hover;

                &.is-true {
                    background-color: $green-hover;
                }

                &.color-neutral {
                    background-color: $blue-hover;
                }
            }
        }

        &:active {
            background-color: $background-tertiary-active;

            .ipl-toggle__button {
                background-color: $red-active;

                &.is-true {
                    background-color: $green-active;
                }

                &.color-neutral {
                    background-color: $blue-active;
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
                color: $text-color-disabled;
                transition-duration: $transition-duration-med;
                text-align: center;
                overflow-wrap: break-word;
                word-break: break-all;

                &.selected {
                    color: $text-color;
                }
            }
        }

        .ipl-toggle__button {
            position: absolute;
            height: calc(100% - 4px);
            width: calc(50% - 4px);
            background-color: $red;
            left: calc(50% + 2px);
            top: 2px;
            border-radius: $border-radius-inner;
            z-index: 1;
            transition-duration: $transition-duration-med;

            &.is-true {
                // Fixes oddities with Safari on iOS
                left: calc(0% + 2px);
                background-color: $green;
            }

            &.color-neutral {
                background-color: $blue;
            }
        }
    }
</style>
