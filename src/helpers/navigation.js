export const hasNoAccordion = field => {
  const alwaysOpen = ['heading', 'hint'].includes(field.type);
  const accordionDisabled = field.hideAccordion === true;

  return alwaysOpen || accordionDisabled;
};
