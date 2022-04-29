# ipl-upload

## Note on drag-and-drop functionality

For dragging and dropping to upload a file to work, the default behavior for the `drop` and `dragover` events 
must be disabled. See the example template file (`/examples/template.html`) for an example
of how this can be implemented.

## Props

### modelValue

The uploaded file. Handled automatically by `v-model`.

## Events

### update:modelValue

Value update.  Handled automatically by `v-model`.
