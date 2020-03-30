import form from '@/data/form.json';
import { hasNoAccordion } from '@/helpers/navigation.js';

const steps = Object.keys(form);
const currentStepFields = step => {
  const fields = Object.keys(form[step].fields).filter(
    fieldId => !hasNoAccordion(form[step].fields[fieldId])
  );
  return fields;
};

export default {
  computed: {
    navForm_prevLocation() {
      const routerStep = this.$route.query.step;
      const fields = currentStepFields(routerStep);

      const stepIndex = steps.indexOf(routerStep);
      const fieldIndex = fields.indexOf(this.$route.query.field);

      // button verstecken
      if (fieldIndex === 0 && stepIndex === 0) return false;

      // step zurück
      if (fieldIndex === 0)
        return { step: steps[stepIndex - 1], field: undefined };

      // field zurück
      return { step: routerStep, field: fields[fieldIndex - 1] };
    },
    navForm_nextLocation() {
      const routerStep = this.$route.query.step;
      const fields = currentStepFields(routerStep);

      const stepIndex = steps.indexOf(routerStep);
      const fieldIndex = fields.indexOf(this.$route.query.field);

      // button verstecken
      if (fieldIndex === fields.length - 1 && stepIndex === steps.length - 1)
        return false;

      // step weiter
      if (fieldIndex === fields.length - 1)
        return { step: steps[stepIndex + 1], field: undefined };

      // field weiter
      return { step: routerStep, field: fields[fieldIndex + 1] };
    }
  },
  methods: {
    navForm_next() {
      this.$router.push({ query: this.navForm_nextLocation });
    },
    navForm_prev() {
      this.$router.push({ query: this.navForm_prevLocation });
    }
  }
};
