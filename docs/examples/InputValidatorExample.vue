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
import { IplInput, maxLength, numeric, provideValidators, validator } from '../../src';
import { ref } from 'vue';

const firstInputValue = ref('999');
const secondInputValue = ref('Test Value');

const { allValid: valid } = provideValidators({
    firstInput: validator(true, numeric),
    secondInput: validator(true, maxLength(10)),
});
</script>
