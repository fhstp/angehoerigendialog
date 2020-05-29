# Angehörigendialog

## Project structure

### data
This folder contains the data which is used to configure the questionnaire and the visualisations.

The sequence of the sections is defined in `_inhaltsverzeichnis.yml`. Each section corresponds to a `.yml`-file which contains information about the section and its fields.

The file `visualisation.yml` defines properties for the visualisations.

### public
Contains static files such as favicons or the `index.html`.

### src

- `assets`
  <details>
    <summary>Assets are resources passed through Webpack</summary>
    <ul>
      <li><code>fonts</code></li>
      <li><code>icons</code></li>
      <li><code>images</code></li>
      <li><code>styles</code>: <code>_variables.scss</code> is imported globally and available in the <code>style</code>-tags of the Single File Components. The styles of `base.scss` are available on all views.</li>
    </ul>
  </details>
- `components`
  <details>
    <summary>Vue components which are used by the app</summary>
    <ul>
      <li><code>fields</code>: Components which represent a field type which is defined in [data](#data)</li>
      <li><code>note</code></li>
      <li><code>ui</code>: UI elements</li>
      <li><code>visualisations</code>: Components of the visualisations</li>
      <li><code>AnField.vue</code>: Wrapper component for the <code>fields</code>-components</li>
    </ul>
  </details>
- `data`: receives the compiled data files from the folder [data](#data)
- `helpers`: contains helper functions
- `mixins`: contains the files `field.js` and `visualisation.js` which extract shared logic of the respective component types
- `router`: defines the routes which are supplied to `vue-router`
- `store`: configures the `vuex` store which stores the user inputs
- `views`: views for the routes
- `App.vue` and `main.js`: are the entry point for the application
