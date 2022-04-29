# 2.7.0

- Allow ipl-progress-bar to accept arbitrary hex color values

# 2.6.2

- Fix some components having an incorrect appearance without some external stylesheets 

# 2.6.1

- Fix some ipl-button properties not animating as expected

# 2.6.0

- Add `use-neutral-colors` prop to ipl-toggle
- Fix an issue with ipl-toggle not displaying correctly in some cases

# 2.5.0

- Add `v-model:expanded` to ipl-expanding-space, reflecting the component's expanded state.
- Add an examples page for development use (`yarn serve`)
- Use Font Awesome 6

# 2.4.0

- Add ipl-radio

# 2.3.1

- Reduce compilation target to improve browser support

# 2.3.0

- Emit event when ipl-button is right-clicked
- Add `ipl-small-toggle` component

# 2.2.1

- Incredibly minor: Remove default margin from ipl-button

# 2.2.0

- Allow ipl-toggle to accept custom label text

# 2.1.1

- Fix ipl-message content sometimes not taking up the whole width of the component as expected

# 2.1.0

- Allow ipl-input to accept more types

# 2.0.0

- Use inject/provide to pass validators to ipl-input instead of props
- Export more helpers for validation, parsing colors and other small tasks
- Add `clickable` prop to ipl-space

# 1.2.1

- Slightly change ipl-select padding to closer match ipl-input style

# 1.2.0

- Allow ipl-button `href` property to be customized

# 1.1.0

- Bundle scss styles in distribution to provide dependents with color constants
- Fix ipl-button scrolling the page unexpectedly
- Fix ipl-button flashing in certain cases when using Chrome

# 1.0.1

- Fix ipl-input throwing errors when v-model is set to null
