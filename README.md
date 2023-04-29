# @iplsplatoon/vue-components

[Docs](https://ipl-vue-components.readthedocs.io)

Vue components for internal Inkling Performance Labs utilities, most notably [ipl-overlay-controls.](https://github.com/inkfarer/ipl-overlay-controls)

## Install

`npm i @iplsplatoon/vue-components` or `yarn add @iplsplatoon/vue-components`

To use the components, import them as follows:

`import { IplButton } from '@iplsplatoon/vue-components';`

## Development

To test this package on another project:

- Run a build (`yarn build`)
- Package the built files (`yarn pack`). The command will output the directory where the completed tarball was saved.
- Install the package, giving npm or yarn the path to your tarball
  - Example: `npm i /users/inkfarer/iplsplatoon-vue-components-v2.3.0.tgz`
  - This will change the contents of your lockfile. Please ensure you don't commit a lockfile containing a path to a
    local tarball!

To test this package locally:

- Run the serve command (`yarn serve`)
- Edit or add examples in the `examples` directory.

To run unit tests:

- Run `yarn test`
- To update snapshot files, run `yarn test:update`

## Acknowledgements

The `ipl-spinner` component contains code from the [Material Web](https://github.com/material-components/material-web) project, which is licensed under the [Apache License 2.0](https://github.com/material-components/material-web/blob/main/LICENSE)
