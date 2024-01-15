<template>
    <div class="ipl-multi-select">
        <ipl-label>{{ label }}</ipl-label>
        <select
            ref="select"
            @change.stop="handleSelectChange"
        >
            <option
                v-for="option in options"
                :key="`option_${option.value}`"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>
        <div
            ref="elemDisplay"
            class="elem-display"
        >
            <button
                v-for="(option, index) in modelValue"
                :key="option.value"
                class="option"
                @click="deselectOption(index)"
            >
                {{ option.name }}
                <font-awesome-icon
                    :icon="faXmark"
                    class="remove-icon"
                />
            </button>
            <div class="icon-container">
                <font-awesome-icon
                    :icon="faChevronDown"
                    class="icon"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
import { SelectOptions } from '../types/select';
import IplLabel from './iplLabel.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import clone from 'lodash/clone';

export default defineComponent({
    name: 'IplMultiSelect',

    components: { IplLabel, FontAwesomeIcon },

    props: {
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array as PropType<SelectOptions>,
            required: true
        },
        modelValue: {
            type: [null, Array] as PropType<SelectOptions>,
            required: true
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        const select: Ref<HTMLSelectElement | null> = ref(null);
        const elemDisplay = ref<HTMLDivElement | null>(null);

        onMounted(() => {
            if (select.value) {
                select.value.selectedIndex = -1;
            }
        });

        watch(() => props.options, (newValue, oldValue) => {
            if (oldValue.length === newValue.length) return;
            emit('update:modelValue', props.modelValue.filter(selectedOption =>
                newValue.some(option => option.value === selectedOption.value)));
        });

        return {
            handleSelectChange(event: Event) {
                const target = event.target as HTMLSelectElement;
                const selectedOption = props.options[target.selectedIndex];
                if (!props.modelValue?.some(option => option.value === selectedOption.value)) {
                    emit('update:modelValue', [
                        ...(props.modelValue ?? []),
                        selectedOption
                    ]);
                }

                if (select.value) {
                    select.value.selectedIndex = -1;
                }
            },
            deselectOption(index: number) {
                const options = elemDisplay.value?.querySelectorAll('.option');
                if (options !== undefined && options.length > 1) {
                    const previousOption = options[index === options.length - 1 ? index - 1 : index + 1] as HTMLElement;
                    previousOption.focus();
                }

                const result = clone(props.modelValue);
                result.splice(index, 1);
                emit('update:modelValue', result);
            },
            select,
            elemDisplay,
            faChevronDown,
            faXmark
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-multi-select {
    position: relative;
    transition-duration: constants.$transition-duration-low;

    &:focus-within {
        .elem-display {
            border-color: var(--ipl-input-color-focus);
        }

        label {
            color: var(--ipl-input-color-focus);
        }
    }

    select {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        font-size: 1em;
    }

    .elem-display {
        border-bottom: 1px solid var(--ipl-input-color);
        min-height: 30px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        z-index: 2;
        pointer-events: none;
        padding-bottom: 4px;
        box-sizing: border-box;

        > .icon-container {
            flex-grow: 1;
            align-self: flex-end;
            margin-right: 5px;
            margin-bottom: 2px;
            margin-top: 2px;

            > .icon {
                font-size: 0.75em;
                color: var(--ipl-input-color-focus);
                float: right;
                display: inline-block;
                text-align: right;
            }
        }

        .option {
            background-color: var(--ipl-bg-secondary);
            border-radius: 8px;
            font-size: 14px;
            font-weight: 400;
            font-family: inherit;
            line-height: inherit;
            padding: 2px 4px;
            margin: 2px;
            pointer-events: auto;
            transition-property: background-color;
            transition-duration: constants.$transition-duration-low;
            user-select: none;
            overflow-wrap: anywhere;
            cursor: default;
            border: 0;
            color: inherit;
            height: fit-content;

            > .remove-icon {
                font-size: 1em;
                color: #728EC2;
            }

            &:hover {
                background-color: var(--ipl-bg-secondary-hover);
            }

            &:active {
                background-color: var(--ipl-bg-secondary-active);
            }

            &:focus-visible {
                outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
            }
        }
    }
}
</style>
