`@iplsplatoon/vue-components` provides Vue components for internal Inkling Performance Labs utilities, most notably [ipl-overlay-controls.](https://github.com/inkfarer/ipl-overlay-controls)

## Install

- Install the library: `npm i @iplsplatoon/vue-components` or `yarn add @iplsplatoon/vue-components`
- Import the library styles
  - In JS/TS: `import '@iplsplatoon/vue-components/style.css';`
  - In (S)CSS: `@import '@iplsplatoon/vue-components/style.css';`
  - With Nuxt: 
    ```ts
    export default defineNuxtConfig({
      // ...
      css: ['@iplsplatoon/vue-components/style.css']
    })
    ```
- To use the components, import them as follows: `import { IplButton } from '@iplsplatoon/vue-components';`

## Development

To test this package on another project:

- Run a build (`yarn build`)
- Package the built files (`yarn pack`). The command will output the directory where the completed tarball was saved.
- Install the package, giving npm or yarn the path to your tarball
    - Example: `npm i /users/inkfarer/iplsplatoon-vue-components-v2.3.0.tgz`
    - This will change the contents of your lockfile. Please ensure you don't commit a lockfile containing a path to a
      local tarball!

To run unit tests:

- Run `yarn test`
- To update snapshot files, run `yarn test:update`
