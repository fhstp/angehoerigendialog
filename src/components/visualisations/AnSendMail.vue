<template>
  <a
    :href="`mailto:?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`"
    class="btn an-sendmail"
    >E-Mail senden</a
  >
</template>

<script>
export default {
  name: 'AnSendMail',

  data: () => ({
    cc: 'a.a@gmx.at',
    bcc: 'b.b@gmx.at',
    body:
      'Sehr%20geehrte%20Damen%20und%20Herren,%0D%0DIm%20Anhang%20senden%20wir%20Ihnen%20die%20Auswertung%20des%20Volkshilfe-Fragebogens.%0D%0DMit%20freundlichen%20Grüßen%0DIhr Volkshilfe-Team',
    subject: 'Angehörigendialog%20Fragebogenauswertung'
  }),
  methods: {}
};
</script>

<style lang="scss" scoped>
.an-sendmail {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
}
</style>
