<template>
    <div
        class="ipl-select__wrapper"
        :class="{disabled}"
    >
        <ipl-label>
            {{ label }}
            <select
                ref="select"
                v-model="model"
                :disabled="disabled"
            >
                <template v-if="!!options">
                    <option
                        v-for="option in options"
                        :key="`option_${option.value}`"
                        :value="option.value"
                        :disabled="option.disabled"
                    >
                        {{ option.name }}
                    </option>
                </template>
                <template v-else-if="!!optionGroups">
                    <optgroup
                        v-for="(group, groupIndex) in optionGroups"
                        :key="`optgroup_${groupIndex}`"
                        :label="group.name"
                    >
                        <option
                            v-for="(option, optionIndex) in optionGroups[groupIndex].options"
                            :key="`option_${groupIndex}_${optionIndex}`"
                            :value="option.value"
                            :disabled="option.disabled"
                        >
                            {{ option.name }}
                        </option>
                    </optgroup>
                </template>
            </select>
            <font-awesome-icon
                :icon="faChevronDown"
                class="icon"
            />
        </ipl-label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import IplLabel from './iplLabel.vue';
import { SelectOptionGroups, SelectOptions } from '../types/select';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
    name: 'IplSelect',

    components: { FontAwesomeIcon, IplLabel },

    props: {
        label: {
            type: String,
            default: null
        },
        options: {
            type: Array as PropType<SelectOptions | null>,
            default: null
        },
        optionGroups: {
            type: Array as PropType<SelectOptionGroups | null>,
            default: null
        },
        modelValue: {
            type: [ String, null ] as PropType<string | null>,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        if (!props.options && !props.optionGroups) {
            throw new Error('ipl-select requires either options or option groups to be set.');
        }

        const select = ref<HTMLSelectElement | null>(null);

        const flatOptionGroups = computed(() => {
            if (props.optionGroups == null) {
                return null;
            }

            return props.optionGroups.flatMap(group => group.options);
        });

        return {
            select,
            model: computed({
                get() {
                    return props.modelValue;
                },
                set(value) {
                    if (!select.value) {
                        emit('update:modelValue', value);
                    } else {
                        if (props.options) {
                            emit('update:modelValue', value, props.options[select.value.selectedIndex]);
                        } else {
                            emit('update:modelValue', value, flatOptionGroups.value?.[select.value.selectedIndex]);
                        }
                    }
                }
            }),
            faChevronDown
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-select__wrapper {
    border-bottom: 1px solid var(--ipl-input-color);
    position: relative;

    &.disabled select {
        color: var(--ipl-disabled-body-text-color);
        pointer-events: none;
    }

    &:focus-within {
        border-color: var(--ipl-input-color-focus);

        label {
            color: var(--ipl-input-color-focus);
        }
    }

    .icon {
        position: absolute;
        right: 5px;
        bottom: 7px;
        font-size: 1em;
        color: var(--ipl-input-color-focus);
        pointer-events: none;
    }
}

select {
    background-color: transparent;
    border: 0;
    width: 100%;
    color: var(--ipl-body-text-color);
    font-size: 1.33em;
    font-family: constants.$body-font;
    outline: 0;
    padding: 0 20px 0 0;
    margin: 2px 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

option,
optgroup {
    color: black;
}
</style>
