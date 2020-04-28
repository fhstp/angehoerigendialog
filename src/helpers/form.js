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

export function restartQuestionnaire() {
  if (
    !confirm(
      'Möchten sie den vorherigen Fragebogen wirklich überschreiben/löschen?'
    )
  )
    return;
  this.$store.commit('resetState');
  this.$router.push({ path: 'fragebogen' });
}
