# ipl-select

## Props

### label

The label of the input.

### options

Available options. Must be an array of objects with `name`, `value` and optionally `disabled` properties. 
Either this or `optionGroups` must be provided.

### optionGroups

Available option groups. Must be an array of objects with `name` and `options` properties, with `options` containing a list of options.
Either this or `options` must be provided.

### modelValue

The selected option. Handled automatically by `v-model`.

### disabled

Whether the selector is disabled or not.

## Events

### update:modelValue

Value update. Handled automatically by `v-model`.
