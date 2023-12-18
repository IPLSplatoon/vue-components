---
title: ipl-select
---

# ipl-select

::: demo SelectExample

### Accessing additional data in options

By default, `<select>` elements only allow their values to be expressed as strings. To provide access the full data of 
the option passed into this component, the `update:modelValue` event passes the full option object as the second 
parameter of the event. Besides the required `name` and `value` parameters, these objects may contain any arbitrary data.
(Try selecting "Option 2" in the above example.)

## Option Groups

::: demo SelectGroupsExample
