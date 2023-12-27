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
        <div class="elem-display">
            <button
                v-for="option in modelValue"
                :key="option.value"
                class="option"
                @click="deselectOption(option.value)"
            >
                {{ option.name }}
                <font-awesome-icon
                    icon="xmark"
                    class="remove-icon"
                />
            </button>
            <div class="icon-container">
                <font-awesome-icon
                    icon="chevron-down"
                    class="icon"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, PropType, Ref, ref, watch } from 'vue';
import { SelectOptions } from '../types/select';
import IplLabel from './iplLabel.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

library.add(faChevronDown, faXmark);

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

        onMounted(() => {
            if (select.value) {
                select.value.selectedIndex = -1;
            }
        });

        onUpdated(() => {
            if (select.value) {
                select.value.selectedIndex = -1;
            }
        });

        watch(() => props.options, newValue => {
            emit('update:modelValue', props.modelValue.filter(selectedOption =>
                newValue.some(option => option.value === selectedOption.value)));
        });

        return {
            handleSelectChange(event: Event) {
                const target = event.target as HTMLSelectElement;
                const selectedOption = target.options[target.selectedIndex];
                if (!props.modelValue?.some(option => option.value === selectedOption.value)) {
                    emit('update:modelValue', [
                        ...(props.modelValue ?? []),
                        { value: selectedOption.value, name: selectedOption.text }
                    ]);
                }
            },
            deselectOption(value: string) {
                emit('update:modelValue', props.modelValue.filter(option => option.value !== value));
            },
            select
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
            border-color: var(--ipl-input-color-active);
        }

        label {
            color: var(--ipl-input-color-active);
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

        > .icon-container {
            flex-grow: 1;
            align-self: flex-end;
            margin-right: 5px;
            margin-bottom: 2px;
            margin-top: 2px;

            > .icon {
                font-size: 0.75em;
                color: var(--ipl-input-color-active);
                float: right;
                display: inline-block;
                text-align: right;
            }
        }

        .option {
            background-color: var(--ipl-bg-secondary);
            border-radius: 8px;
            font-size: 14px;
            padding: 2px 4px;
            margin: 2px;
            pointer-events: auto;
            transition-property: background-color;
            transition-duration: constants.$transition-duration-low;
            user-select: none;
            overflow-wrap: anywhere;
            cursor: default;

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
                outline: var(--ipl-focus-outline-color) solid 2px;
            }
        }
    }
}
</style>
