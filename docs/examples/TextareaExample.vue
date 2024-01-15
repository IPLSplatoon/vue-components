<template>
    <div>
        <!-- #region example -->
        <ipl-textarea
            v-model="inputValue"
            label="Textarea"
            placeholder="Placeholder"
            name="textarea-example"
            :disabled="disabled"
        />
        <!-- #endregion example -->
    </div>
    <div class="horizontal-layout">
        <ipl-checkbox
            v-model="disabled"
            label="Disabled"
        />
    </div>
</template>

<script setup lang="ts">
import { IplTextarea, IplCheckbox, provideValidators, validator, notBlank } from '../../src';
import { ref } from 'vue';

const inputValue = ref('Input Value!');
const disabled = ref(false);

provideValidators({
    'textarea-example': validator(true, notBlank)
});
</script>
