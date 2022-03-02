# ipl-button

## Props

### label

A text label. Must be provided if `icon` prop is unset.

### icon

A [Font Awesome](https://fontawesome.com/) icon to be displayed on the button. Must be provided if `label` prop is unset.

### color

The button's background color. It may be a predefined color or a hex value (Must start with `#`)

### disabled

If true, `click` events will not be emitted and the button will be grayed out.

### async

Used for indicating the state of long-running tasks, such as importing data from an external source.

If set to true, and when the click handler returns a promise, the button will:

- Disable itself and display a message (defined by `progressMessage`) while waiting for the click handler to complete.
- Change color and display a message (defined by `successMessage`) when the click handler resolves successfully. 
- Change color if the click handler rejects.

### progressMessage

Message to display when an asynchronous operation is in progress (See `async`).

### successMessage

Message to display when an asynchronous operation has succeeded (See `async`). 
Additionally can be displayed when `disableOnSuccess` is true.

### requiresConfirmation

Asks the user to confirm the action by pressing the button a second time before the click handler is triggered.

### shortConfirmationMessage

Changes the confirmation message displayed when asking for confirmation (See `requiresConfirmation`) to a shorter variant.

### small

Reduces the button's size.

### disableOnSuccess

Briefly disables the button and displays `successMessage` when the button is clicked, regardless of `async` state.

## Events

### click

Emitted when the button's action should be carried out. If `async` is set to true, this handler should return a promise.

### rightClick

Emitted when the button is right-clicked. Passes the event on through to the handler, into which `preventDefault()`
can be called if desired.
