# Angehörigendialog

## Project structure

### data
This folder contains the data which is used to configure the questionnaire and the visualisations.

The sequence of the sections is defined in [`_inhaltsverzeichnis.yml`](data/_inhaltsverzeichnis.yml). Each section corresponds to a `.yml`-file which contains information about the section and its fields.

The file [`visualisation.yml`](data/visualisation.yml) defines properties for the visualisations.

[`_converter.js`](data/_converter.js) is the script which compiles the data and saves it to `src/data`.


### public
Contains static files such as favicons or the [`index.html`](public/index.html).


### src

- [`assets`](src/assets): Assets are resources passed through Webpack</summary>
  - [`fonts`](src/assets/fonts): Open Sans Regular (400) + Bold (700)
  - [`icons`](src/assets/icons): miscellaneous vector graphics for form / visualisations *TODO folder needs rename*
  - [`images`](src/assets/images): images in the assets folder are passed through Webpack as opposed to the `public` folder
  - [`styles`](src/assets/styles):
    - [`_variables.scss`](src/assets/styles/_variables.scss) defines SCSS variables which are available in the `style`-tags of the Single File Components. Includes predefined colors and media queries.
    - The styles of [`base.scss`](src/assets/styles/base.scss) are available on all views.
    - [`_grid.scss`](src/assets/styles/_grid.scss) generates grid helper classes which are imported to the `base.scss`
- [`components`](src/components): Vue components used by the `views`
  - [`AnField.vue`](src/components/AnField.vue): Wrapper component for the `fields`-components
  - [`fields`](src/components/fields): Components which represent the field types of the questionnaire [data](#data)
  - [`note`](src/components/note): Notepad and notepad open button
  - [`ui`](src/components/ui): UI elements
  - [`visualisations`](src/components/visualisations): Components of the visualisations
- [`data`](src/data): receives the compiled data files from the folder [data](#data) in the build process
- [`helpers`](src/helpers): contains helper functions which are used by various components
- [`mixins`](src/mixins): contains the files `field.js` and `visualisation.js` which defines shared logic for the `fields` and the `visualisations` respectively
- [`router`](src/router/index.js): defines the routes which are supplied to `vue-router`
- [`store`](src/store/index.js): configures the **Vuex** store which holds and manages the user inputs and shared variables
- [`views`](src/views): views for the routes
- [`App.vue`](src/App.vue) and [`main.js`](src/main.js): are the entry point for the application
- [`registerServiceWorker.js`](src/registerServiceWorker.js): registers service worker for offline usage, comes from vue-cli


### Different files

- [`.editorconfig`](.editorconfig): defines settings for code editors — [official docs](https://editorconfig.org/)
- [`jsconfig.json`](jsconfig.json): editors might need this file for code navigation (looking at you VSCode)
- [`vue.config.js`](vue.config.js): configuration of the [Vue Cli Tools](https://cli.vuejs.org/config/#vue-config-js)
  - webpack: svgs can be imported like vue components using the `?inline` suffix
  - css: source maps generation for css gets enabled and `_variables.scss` will be prepended on each component
  - pwa: as the web app has offline capabilities, name, icon and colors need to be configured here — [official docs](https://cli.vuejs.org/core-plugins/pwa.html)
- [`package.json`](package.json):
  - scripts: See [Development lifecycle](#development-lifecycle)
  - eslintConfig (+ prettier) — [official docs](https://eslint.org/docs/rules/)
    - components inside of vue template tags have to be **PascalCase**
    - props have to be **kebab-case**
    - objects don't have a trailing comma after the last value
    - single quotes get replaced with double quotes when possible
    - and much more ... (component order, max line length)
  - browserlist: only the last two versions for browsers which have a market share higher then 1% are supported — [list of browsers](https://browserl.ist/?q=last+2+versions+and+%3E+0.2%25%2C+Firefox+ESR%2C+not+IE+%3E+0%2C+not+Edge+%3E+0%2C+not+OperaMini+all%2C+not+UCAndroid+%3E+0)


## Development lifecycle

- install the dependencies
  ```sh
  npm install
  ```

- starts the project in development mode
  ```sh
  npm run serve
  ```

- creates production build in `dist` folder for deployment
  ```sh
  npm run build
  ```

- calls data converter → see [data](#data)
  ```sh
  npm run data
  ```

- calls data converter before each build to ensure correct data
  ```sh
  npm run prebuild
  npm run preserve
  ```

- shows / fixes eslint error → see [different files](#different-files)
  ```sh
  npm run lint
  npm run lintfix
  ```

### Continous Deploment

When the `develop` branch updates, a new build will be automatically generated and deployed from Netlify.
