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
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-radio__options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > .ipl-radio__option {
        transition-duration: $transition-duration-low;
        font-weight: 500;
        font-size: 1em;
        border-radius: $border-radius-inner;
        border: 1px solid $input-color;
        padding: 4px 8px;
        margin-right: 4px;
        margin-top: 4px;
        user-select: none;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }

        &.disabled {
            cursor: unset;
            border-color: #6E6D6D;
            color: $text-color-disabled;
        }

        &:not(.disabled) {
            &:hover {
                border-color: $input-color-hover;
                background-color: rgba(255, 255, 255, 0.05);
            }

            &:active {
                border-color: $input-color-active;
                background-color: rgba(255, 255, 255, 0.2);
            }
        }

        &.selected {
            border-color: $blue;
            background-color: $blue;

            &:not(.disabled) {
                &:hover {
                    background-color: $blue-hover;
                    border-color: $blue-hover;
                }

                &:active {
                    background-color: $blue-active;
                    border-color: $blue-active;
                }
            }
        }
    }
}
</style>
