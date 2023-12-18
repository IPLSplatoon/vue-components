# Editing Documentation

To view documentation locally, run `yarn docs:dev`. New pages can be added to the `docs-new` directory, and the
navigation sidebar can be edited in the `docs-new/.vitepress/config.mts` file.

The documentation is built into a static web page by running `yarn docs:build`. The built documentation can be previewed
by running `yarn docs:preview`.

To add additional code examples, create a Vue component in the `docs-new/examples` directory.

```vue
<template>
    <!-- #region example -->
    <div>
        The first element in the code example should contain 
        the component being demonstrated.
        
        Add a code region named "example" (See the comments 
        starting in #region and #endregion in this code block)
        to control what portion of the example's source code 
        will be displayed in the documentation.  
    </div>
    <div>
        To include custom controls for the example, add another
        element into the example to create a separate section.
    </div>
    <!-- #endregion example -->
</template>
```

To embed the demo component into a markdown document, use the `demo` container - for an example saved under
`docs-new/examples/ExampleFileName.vue`, use the following:

```markdown
::: demo ExampleFileName
```

Component examples are typically named using the follwing format:<br>`{Component Name}{Details}Example.vue`

Examples saved under subdirectories (e.g. `docs-new/examples/new-component/NewComponentExample.vue`) will **not** function.

## Event Log

To add a log of every event emitted by your component example to an example, refer to the following example:

```vue
<template>
    <event-log>
        <div>
            Elements placed in the default slot of the event-log 
            component will have their custom events (defined by 
            "emits" within the component source) captured and logged.
        </div>
        <template #extra>
            <div>
                Content in the "extra" slot will be placed between 
                the event log and component example.
            </div>
        </template>
    </event-log>
</template>
```
