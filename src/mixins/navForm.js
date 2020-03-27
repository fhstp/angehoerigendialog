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

      if (fieldIndex === 0) {
        if (stepIndex === 0) {
          // button verstecken
          return false;
        }

        // step zurück
        return { step: steps[stepIndex - 1] };
      }

      // field zurück
      return { step: routerStep, field: fields[fieldIndex - 1] };
    },
    navForm_nextLocation() {
      const routerStep = this.$route.query.step;
      const fields = currentStepFields(routerStep);

      const stepIndex = steps.indexOf(routerStep);
      const fieldIndex = fields.indexOf(this.$route.query.field);

      if (fieldIndex === fields.length - 1) {
        if (stepIndex === steps.length - 1) {
          // button verstecken
          return false;
        }

        // step weiter
        return { step: steps[stepIndex + 1] };
      }

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
