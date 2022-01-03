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

### validator

Validation result for the input. Must be an object with properties `isValid` and `message`.

### centered

Aligns the input's text to the center of the component.

### formatter

A function that takes in the input's value and returns a formatted value.

### disabled

Forbids changing of the input value if true.

### extra

Additional text after the input.

## Events

### update:modelValue

Value update. Handled automatically by `v-model`.

### focuschange

Focus change event. Returns `true` in payload if focused, `false` if unfocused.

### input

Input event.
