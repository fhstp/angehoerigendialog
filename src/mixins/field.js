export default {
  props: {
    field_id: { type: String, default: undefined },
    field_label: { type: String, default: undefined },
    field_required: { type: Boolean, default: true },
    field_type: { type: String, required: true },
    field_when: { type: Object, default: undefined }
  },
  computed: {
    field_data: {
      get() {
        const fieldParts = this.field_id.split('-');
        const section = fieldParts.shift();
        const key = fieldParts.join('-');
        return this.$store.state.answers[section][key];
      },
      set(value) {
        this.$store.commit('updateAnswer', {
          fieldId: this.field_id,
          value
        });
      }
    }
  }
};
