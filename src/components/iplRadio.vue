<template>
    <fieldset>
        <legend>{{ label }}</legend>
        <div class="ipl-radio__options">
            <label
                v-for="option in options"
                :key="option.value"
            >
                <input
                    type="radio"
                    :checked="option.value === modelValue"
                    :disabled="option.disabled"
                    :name="name"
                    @change="selectOption(option)"
                >
                <span>{{ option.name }}</span>
            </label>
        </div>
    </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed, PropType } from 'vue';
import { SelectOptions, Option } from '../types/select';

export default defineComponent({
    name: 'IplRadio',

    props: {
        modelValue: {
            type: [ String, null ] as PropType<string | null>,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array as PropType<SelectOptions>,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },

    emits: ['update:modelValue'],

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
            selectOption(option: Option) {
                if (!option.disabled) {
                    model.value = option.value;
                }
            }
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/colors';
@use 'src/styles/constants';

fieldset {
    border: none;
    padding: 0;
    margin-inline: 0;
}

legend {
    color: var(--ipl-input-color);
    font-size: 0.75em;
    user-select: none;
    padding-inline: 0;
    transition-duration: constants.$transition-duration-low;
    margin: 2px 0;
}

.ipl-radio__options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > label > span {
        transition-duration: constants.$transition-duration-low;
        font-weight: 500;
        font-size: 1em;
        border-radius: constants.$border-radius-inner;
        border: 1px solid var(--ipl-input-color);
        padding: 4px 8px;
        margin-right: 4px;
        margin-top: 4px;
        display: block;
    }

    > label > input {
        appearance: none;
        position: absolute;
        opacity: 0;

        + span {
            background-color: var(--ipl-input-color-alpha);
        }

        &:focus-visible {
            outline: none;

            + span {
                outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
            }
        }

        &:not(:disabled) {
            + span:hover {
                border-color: var(--ipl-input-color-hover);
                background-color: var(--ipl-input-color-alpha-focus);
            }

            + span:active {
                border-color: var(--ipl-input-color-focus);
                background-color: var(--ipl-input-color-alpha-active);
            }
        }

        &:checked {
            &:not(:disabled) {
                + span:hover {
                    background-color: colors.$blue-hover;
                    border-color: colors.$blue-hover;
                }

                + span:active {
                    background-color: colors.$blue-active;
                    border-color: colors.$blue-active;
                }
            }

            + span {
                border-color: colors.$blue;
                background-color: colors.$blue;
                color: #FFF;
            }
        }

        &:disabled + span {
            cursor: not-allowed;
            color: var(--ipl-disabled-body-text-color);
            background-color: var(--ipl-input-color-alpha-disabled);
        }
    }
}
</style>
