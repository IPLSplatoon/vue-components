<template>
    <ipl-space>
        Value: {{ inputValue }}
        <ipl-input
            v-model="inputValue"
            label="Input"
            name="input"
        />
        <br>
        Formatted value: {{ formattedInputValue }}
        <ipl-input
            v-model="formattedInputValue"
            name="formatted"
            label="Formatted input"
            :formatter="formatter"
        />
        <br>
        <ipl-input
            v-model="extraInputValue"
            name="with-extra"
            label="Input with extra text"
            extra="seconds"
            type="number"
        />
        <br>
        <ipl-input
            v-model="loadingInputValue"
            name="with-loading"
            label="Loading state"
            extra="seconds"
            loading
        />
        <br>
        <ipl-input
            v-model="loadingInputValue"
            name="with-loading"
            label="Loading state"
            loading
        />
        <br>
        input is valid: {{ validatedInputValidator.isValid }}
        <ipl-input
            v-model="validatedInputValue"
            name="validatedInput"
            label="Validated input (max length)"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IplSpace from '../../src/components/iplSpace.vue';
import IplInput from '../../src/components/iplInput.vue';
import { ref } from 'vue';
import { maxLength, provideValidators, validator } from '../../src';

export default defineComponent({
    name: 'InputExample',

    components: { IplInput, IplSpace },

    setup() {
        const validatedInputValue = ref('');
        const validatedInputValidator = validator(validatedInputValue, false, maxLength(10));

        provideValidators({
            validatedInput: validatedInputValidator
        });

        return {
            inputValue: ref(null),
            formattedInputValue: ref(null),
            formatter: (value: string) => {
                return value.substring(0, 10);
            },
            extraInputValue: ref(0),
            loadingInputValue: ref(''),
            validatedInputValue,
            validatedInputValidator
        };
    }
});
</script>
