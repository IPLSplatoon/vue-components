<template>
    <ipl-space>
        selected value: {{ selectValue }}
        <br>
        details: {{ additionalOptionDetails }}
        <ipl-select
            v-model="selectValue"
            :options="options"
            label="Select"
            @update:model-value="onValueChange"
        />
        <h3>Option groups</h3>
        selected value: {{ groupedSelectValue }}
        <br>
        details: {{ groupedSelectDetails }}
        <ipl-select
            v-model="groupedSelectValue"
            :option-groups="optionGroups"
            label="Select w/ option groups"
            @update:model-value="onGroupedValueChange"
        />
        <br>
        <ipl-select
            model-value="opt1"
            :options="[{ name: 'Option One', value: 'opt1' }]"
            disabled
            label="Disabled"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplSelect, IplSpace } from '../../src';
import { ref } from 'vue';

const selectValue = ref<string | null>(null);
const additionalOptionDetails = ref<Record<string, unknown> | null>(null);

function onValueChange(newValue: string, details: Record<string, unknown>) {
    additionalOptionDetails.value = details;
}

const options = [
    { name: 'option one', value: 'opt1' },
    { name: 'option two', value: 'opt2', additionalDetails: 'test test?' },
    { name: 'option three', value: 'opt3' }
];

const groupedSelectValue = ref<string | null>(null);
const groupedSelectDetails = ref<Record<string, unknown> | null>(null);

function onGroupedValueChange(newValue: string, details: Record<string, unknown>) {
    groupedSelectDetails.value = details;
}

const optionGroups = [
    {
        name: 'first group!',
        options: [
            { name: 'option one', value: 'opt1' },
            { name: 'option two', value: 'opt2', additionalDetails: 'test test?' },
            { name: 'option three', value: 'opt3' }
        ]
    },{
        name: 'second group!',
        options: [
            { name: 'option four', value: 'opt4' },
            { name: 'option five', value: 'opt5' },
        ]
    }
];
</script>
