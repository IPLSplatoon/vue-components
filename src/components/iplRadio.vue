<template>
    <div class="ipl-radio__wrapper">
        <ipl-label>{{ label }}</ipl-label>
        <div class="ipl-radio__options">
            <div
                v-for="option in options"
                :key="option.value"
                class="ipl-radio__option wrap-anywhere"
                :class="{ selected: option.value === modelValue, disabled: option.disabled }"
                :data-test="`option_${option.value}`"
                @click="selectOption(option)"
            >
                {{ option.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IplLabel from './iplLabel.vue';
import { computed, PropType } from 'vue';
import { SelectOptions, Option } from '../types/select';

export default defineComponent({
    name: 'IplRadio',

    components: { IplLabel },

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

.ipl-radio__options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > .ipl-radio__option {
        transition-duration: constants.$transition-duration-low;
        font-weight: 500;
        font-size: 1em;
        border-radius: constants.$border-radius-inner;
        border: 1px solid var(--ipl-input-color);
        padding: 4px 8px;
        margin-right: 4px;
        margin-top: 4px;
        user-select: none;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }

        &.selected {
            border-color: colors.$blue;
            background-color: colors.$blue;
            color: #FFFFFF;

            &:not(.disabled) {
                &:hover {
                    background-color: colors.$blue-hover;
                    border-color: colors.$blue-hover;
                }

                &:active {
                    background-color: colors.$blue-active;
                    border-color: colors.$blue-active;
                }
            }
        }

        &.disabled {
            cursor: not-allowed;
            color: var(--ipl-disabled-body-text-color);
        }

        &:not(.disabled) {
            &:hover {
                border-color: var(--ipl-input-color-hover);
                background-color: var(--ipl-input-color-alpha-hover);
            }

            &:active {
                border-color: var(--ipl-input-color-active);
                background-color: var(--ipl-input-color-alpha-active);
            }
        }
    }
}
</style>
