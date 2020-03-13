export default {
  props: {
    field_type: {type: String, required: true},
    field_id: {type: String, default: undefined},
    field_label: {type: String, default: undefined},
    field_required: {type: Boolean, default: false},
    field_when: {type: Object, default: undefined}
  }
}
