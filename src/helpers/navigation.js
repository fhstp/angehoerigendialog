import form from '@/data/form.json';

export const hasNoAccordion = field => {
  const alwaysOpen = ['heading', 'hint'].includes(field.type);
  const accordionDisabled = field.hideAccordion === true;

  return alwaysOpen || accordionDisabled;
};

const steps = Object.keys(form);
const currentStepFields = step => {
  const fields = Object.keys(form[step].fields).filter(
    fieldId => !hasNoAccordion(form[step].fields[fieldId])
  );
  return fields;
};

export const prevLocation = (routerStep, routerField) => {
  const fields = currentStepFields(routerStep);

  const stepIndex = steps.indexOf(routerStep);
  const fieldIndex = fields.indexOf(routerField);

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
};

export const nextLocation = (routerStep, routerField) => {
  const fields = currentStepFields(routerStep);

  const stepIndex = steps.indexOf(routerStep);
  const fieldIndex = fields.indexOf(routerField);

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
};
