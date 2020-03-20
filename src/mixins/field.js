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
        return this.$store.getters.getField(this.field_id);
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
