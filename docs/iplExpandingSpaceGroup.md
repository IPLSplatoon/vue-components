# ipl-expanding-space-group

A group of `ipl-expanding-space` elements. Only one space in a group may be expanded at one time.

Each `ipl-expanding-space` contained within a group must have a `key` attribute set in order for the group to function properly.

## Props

### modelValue

The currently selected space. Compatible with `v-model`.
Allows for the selected space to be overwritten by the parent component. 

## Events

### update:modelValue

Value update. Handled automatically by `v-model`.
