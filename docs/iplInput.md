# ipl-input

## props

### label

The label of the input.

### modelValue

The input's value. Handled automatically by `v-model`.

### type

The input's type. Must be one of `text`, `number` or `color`.

### name

The input's name.

### centered

Aligns the input's text to the center of the component.

### formatter

A function that takes in the input's value and returns a formatted value.

### disabled

Forbids changing of the input value if true.

### extra

Additional text after the input.

### loading

If true, a loading spinner is added to the spinner to indicate an action in progress.

## Events

### update:modelValue

Value update. Handled automatically by `v-model`.

### focuschange

Focus change event. Returns `true` in payload if focused, `false` if unfocused.

### input

Input event.

## Validation example

```vue
<template>
    <ipl-input
        v-model="name"
        name="name"
        label="Name"
    />
</template>

<script lang="ts">
import { 
    IplInput,
    provideValidators,
    validator,
    notBlank 
} from '@iplsplatoon/vue-components';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { IplInput },

    setup() {
        const name = ref('');
        // Pass in a value to validate, whether to 
        // validate the value immediately or not, and any amount 
        // of methods that accept the value as a parameter and
        // return a validation result.
        const nameValidator = validator(name, false, notBlank);
        // Provide the validators so the input components may
        // see them. The object key must match the input's
        // 'name' property.
        provideValidators({ name: nameValidator });
        
        return {
            name
        };
    }
});
</script>
```
