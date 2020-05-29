# Angehörigendialog

## Project structure

### data
markup for the questionnaire and the visualisations

### public
static files such as favicons or the `index.html`

### src

- `assets`
- `components`
  <details>
    <summary>Vue components which are used by the app</summary>
    <ul>
      <li>`fields`: Components which represent a field type which is defined in [data](#data)</li>
      <li>`note`</li>
      <li>`ui`: UI elements</li>
      <li>`visualisations`: Components of the visualisations</li>
      <li>`AnField.vue`: Wrapper component for the `fields`-components</li>
    </ul>
  </details>
- `data`
- `helpers`
- `mixins`
- `router`
- `store`
- `views`
