{::options parse_block_html="true" /}

# Angehörigendialog

## Project structure

### data
markup for the questionnaire and the visualisations

### public
static files

### src

- `assets`
- `components`
  <details>
    <summary markdown="span">Vue components which are used by the app</summary>
    - `fields`: Components which represent a field type which is defined in [data](#data)
    - `note`
    - `ui`: UI elements
    - `visualisations`: Components of the visualisations
    - `AnField.vue`: Wrapper component for the `fields`-components
  </details>
- `data`
- `helpers`
- `mixins`
- `router`
- `store`
- `views`
