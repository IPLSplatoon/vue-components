# ipl-multi-select

A component that allows selecting multiple elements from a list of options.

## Props

### label

The label of the input.

### options

Available options. Must be an array of objects with `name`, `value` and optionally `disabled` properties.

### modelValue

The input's value. Handled automatically by `v-model`.

## Events

### update:modelValue

Value update. Handled automatically by `v-model`.
