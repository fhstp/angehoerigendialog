import form from '@/data/form.json';
import { hasNoAccordion } from '@/helpers/navigation.js';

const steps = Object.keys(form);
const currentStepFields = step => {
  const fields = Object.keys(form[step].fields).filter(
    fieldId => !hasNoAccordion(form[step].fields[fieldId].type)
  );
  return fields;
};

export default {
  computed: {
    navForm_currentStepFirstFieldId() {
      const stepFields = currentStepFields(this.$route.query.step);
      return stepFields.length > 0 ? stepFields[0] : false;
    },
    navForm_prevLocation() {
      const routerStep = this.$route.query.step;
      const fields = currentStepFields(routerStep);

      const stepIndex = steps.indexOf(routerStep);
      const fieldIndex = fields.indexOf(this.$route.query.field);

      // no prev field or step
      if (fieldIndex === 0 && stepIndex === 0) return false;

      // previous step and last field of step
      if (fieldIndex === 0)
        return {
          step: steps[stepIndex - 1],
          field: currentStepFields(steps[stepIndex - 1]).pop()
        };

      // previous field
      return { step: routerStep, field: fields[fieldIndex - 1] };
    },
    navForm_nextLocation() {
      const routerStep = this.$route.query.step;
      const fields = currentStepFields(routerStep);

      const stepIndex = steps.indexOf(routerStep);
      const fieldIndex = fields.indexOf(this.$route.query.field);

      // no next field or step
      if (fieldIndex === fields.length - 1 && stepIndex === steps.length - 1)
        return false;

      // next step and first field of step
      if (fieldIndex === fields.length - 1)
        return {
          step: steps[stepIndex + 1],
          field: currentStepFields(steps[stepIndex + 1])[0]
        };

      // next field
      return { step: routerStep, field: fields[fieldIndex + 1] };
    }
  },
  methods: {
    navForm_next() {
      this.$router.push({
        query: this.navForm_nextLocation
          ? this.navForm_nextLocation
          : { ...this.$route.query, field: undefined }
      });
    },
    navForm_prev() {
      this.$router.push({ query: this.navForm_prevLocation });
    }
  }
};
