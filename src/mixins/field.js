export default {
  props: {
    field_id: { type: String, default: undefined },
    field_label: { type: String, default: undefined },
    field_required: { type: Boolean, default: true },
    field_type: { type: String, required: true },
    field_valid: { type: Boolean, default: false },
    field_when: { type: Object, default: undefined }
  },
  computed: {
    field_data: {
      get() {
        const value = this.$store.getters.getFieldValue(this.field_id);
        this.validate(value);
        return value;
      },
      set(value) {
        this.$store.commit('updateAnswerValue', {
          fieldId: this.field_id,
          value
        });
      }
    }
  }
};
