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

/**
 * takes fields and returns array of interactive fields
 * @param {Object.<string, any>} fields
 * @returns {Array.<Object.<string, any>>}
 */
export const form_filterAccordionItems = fields => {
  const filtered = [];
  for (const fieldKey in fields) {
    if (form_isInAccordion(fields[fieldKey].type))
      filtered.push({ ...fields[fieldKey], fieldId: fieldKey });
  }
  return filtered;
};

export function form_restartQuestionnaire() {
  if (
    !confirm(
      'Möchten Sie den vorherigen Fragebogen wirklich überschreiben/löschen?'
    )
  )
    return;
  this.$store.commit('resetState');
  this.$router.push({ path: 'fragebogen' });
}
