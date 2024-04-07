# 3.3.0

- Add an `errorMessage` prop to ipl-button to allow changing the message that appears when an async action fails 
- Fix the `progressMessage` prop of ipl-button doing nothing
- Fix ipl-checkbox visuals sometimes disappearing with long labels

# 3.2.0

- Allow changing the background color of ipl-dialog-title
- Allow adding labels to ipl-small-toggle through its default slot 

# 3.1.0

- Allow adding labels to ipl-button through its default slot
  - For example, this can be used to make a button's label contain an icon and text simultaneously.
- Allow disabling text capitalization on ipl-button

# 3.0.1

- Fix content within the header-extra slot of ipl-expanding-space sometimes being invisible

# 3.0.0

## Breaking

- Library stylesheets must be manually imported 
- ipl-radio requires a `name` prop
- Some style changes may require dependent styles to use `!important` when it wasn't before. Some examples:
  - `text-align` or `display` on ipl-button when the `clickable` prop is set
- Input validation logic has been overhauled - the value to validate is no longer required when declaring field validators.
  - <details>
    <summary>Old implementation</summary>

    ```vue
    <template>
      <ipl-input
        v-model="firstValue"
        name="firstValue"
        label="First Value"
      />
      <ipl-input
        v-model="secondValue"
        name="secondValue"
        label="Second Value"
      />
    </template>

    <script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import {
      allValid,
      IplInput,
      notBlank,
      provideValidators,
      validator
    } from '@iplsplatoon/vue-components';
  
    export default defineComponent({
      components: { IplInput },
  
      setup() {
        const firstValue = ref('');
        const secondValue = ref('');
  
        const firstValueValidator = validator(firstValue, false, notBlank);
        const validators = {
          firstValue: firstValueValidator,
          secondValue: validator(secondValue, false, notBlank)
        };
        provideValidators(validators);
  
        return {
          allValid: computed(() => allValid(validators)),
          firstValueValid: computed(() => firstValueValidator.isValid),
          firstValue,
          secondValue
        };
      }
    });
    </script>
    ```
    </details>
  - <details>
    <summary>New implementation</summary>

    ```vue
    <template>
      <ipl-input
        v-model="firstValue"
        name="firstValue"
        label="First Value"
      />
      <ipl-input
        v-model="secondValue"
        name="secondValue"
        label="Second Value"
      />
    </template>

    <script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import {
      // allValid is no longer an export - use the return value of provideValidators.
      IplInput,
      notBlank,
      provideValidators,
      validator
    } from '@iplsplatoon/vue-components';
  
    export default defineComponent({
      components: { IplInput },
  
      setup() {
        const firstValue = ref('');
        const secondValue = ref('');
  
        const { allValid, fieldIsValid } = provideValidators({
          // The first parameter is no longer present.
          firstValue: validator(false, notBlank),
          secondValue: validator(false, notBlank)
        });
  
        return {
          allValid,
          firstValueValid: computed(() => fieldIsValid('firstValue')),
          firstValue,
          secondValue
        };
      }
    });
    </script>
    ```

  </details>

## Other Changes

- Most components can be controlled by keyboard input when expected
- Some components have been refactored:
  - Clickable ipl-space components use the `<button>` element
  - Buttons use `<button>` instead of `<a>` unless they are links
  - ipl-sidebar uses the built-in `<dialog>` element
  - ipl-small-toggle uses the `<input>` element instead of a bunch of divs
- Buttons acting as links act as expected when they are disabled or require confirmation (#23)

## Additions

- Added ipl-textarea
- Added ipl-pagination
- ipl-input supports adding a placeholder
- Added a larger theme for ipl-input
- SSR support
- Provide separate ESM and UMD builds
- `color` and `without-content-background` props to ipl-expanding-space
- Added `copiable` to ipl-data-row
- ipl-data-row can contain any element as the value through the default slot
- Updated ipl-button:
  - Allow removing the background color
  - Added `inline` prop
  - Button size can be adjusted by changing `font-size` in CSS

# 2.10.1

- Move docs to a vitepress-powered concoction, combining the previously separate plain-text docs and locally built examples into a single site

# 2.10.0

- ipl-select emits the full option object on update as an additional parameter

# 2.9.2

- Revert changes to ipl-button

# 2.9.1

- Fix the content in the header of ipl-expanding-space not being centered correctly
- Add some horizontal padding to ipl-button

# 2.9.0

- Add ipl-spinner component
- Add `loading` prop to ipl-input

# 2.8.0

- Allow close action in ipl-dialog-title to be disabled

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
