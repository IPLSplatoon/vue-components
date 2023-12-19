<template>
    <div class="vertical-layout">
        <div>
            {{ valid ? 'All inputs are valid' : 'Some inputs are invalid' }}
        </div>
        <ipl-input
            v-model="firstInputValue"
            label="Input (Error if value is not numeric)"
            name="firstInput"
        />
        <ipl-input
            v-model="secondInputValue"
            label="Input (Error if value is too long)"
            name="secondInput"
        />
    </div>
</template>

<script setup lang="ts">
import { IplInput, allValid, maxLength, numeric, provideValidators, validator } from '../../src';
import { computed, ref } from 'vue';

const firstInputValue = ref('999');
const secondInputValue = ref('Test Value');

const validators = {
    firstInput: validator(firstInputValue, true, numeric),
    secondInput: validator(secondInputValue, true, maxLength(10)),
};

provideValidators(validators);
const valid = computed(() => allValid(validators));
</script>
