export const form_isInAccordion = fieldType => {
  return !['heading', 'hint'].includes(fieldType);
};

export const form_numberOfAccordionItems = fields => {
  let count = 0;
  for (const fieldKey in fields) {
    if (form_isInAccordion(fields[fieldKey].type)) count++;
  }
  return count;
};

export const form_filterAccordionItems = fields => {
  const filtered = [];
  for (const fieldKey in fields) {
    if (form_isInAccordion(fields[fieldKey].type))
      filtered.push(fields[fieldKey]);
  }
  return filtered;
};
