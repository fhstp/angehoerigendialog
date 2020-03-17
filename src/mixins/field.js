const genDefaultValue = (type) => {
  switch(type) {
    case 'checkboxes':
      return [];
  }
};

export default {
  props: {
    field_type: {type: String, required: true},
    field_id: {type: String, default: undefined},
    field_label: {type: String, default: undefined},
    field_options: {type: Object, default: undefined},
    field_required: {type: Boolean, default: true},
    field_when: {type: Object, default: undefined}
  },
  computed: {
    field_data: {
      get() {
        const fieldParts = this.field_id.split('-');
        const section = fieldParts.shift();
        const key = fieldParts.join('-');
        const storedValue = this.$store.state.answers[section][key];
        return storedValue ?? genDefaultValue(this.field_type);
      },
      set(value) {
        this.$store.commit('updateAnswer', {
          fieldId: this.field_id,
          value
        });
      }
    }
  }
}
