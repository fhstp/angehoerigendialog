<template>
  <div class="ad-field">
    <component
      :is="genComponentName(field_type)"
      v-if="field_type === 'text'"
      v-bind="prepareFieldProps"
    />
    <div v-else>
      Frage von Typ: {{ field_type }}
    </div>
    <div
      v-if="Object.keys(subquestions).length"
      class="ad-field__subquestions"
    >
      <AdField
        v-for="(subfield, subfieldID) in subquestions"
        :key="subfieldID"
        :field_id="`${field_id}-${subfieldID}`"
        v-bind="subfield"
      />
    </div>
  </div>
</template>

<script>
const AdField = this;

import field from '@/mixins/field.js'

export default {
  name: 'AdField',
  components: {
    AdField
  },
  mixins: [field],
  props: {
    parentId: {
      type: String,
      required: true
    },
    subquestions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    prepareFieldProps() {
      return Object.assign(
        {
          subquestions: null,
        },
        this.$props
      )
    }
  },
  methods: {
    genComponentName: type =>
      `Ad${type.charAt(0).toUpperCase()}${type.slice(1)}`
  }
}
</script>
