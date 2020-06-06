<template>
  <a
    :href="`mailto:?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`"
    class="btn an-sendmail"
    >E-Mail senden</a
  >
</template>

<script>
import mailData from '@/data/mail.json';
export default {
  name: 'AnSendMail',

  data: () => ({
    cc: mailData.cc,
    bcc: mailData.bcc,
    body: mailData.body.replace(/ /g, '%20').replace(/(?:\r\n|\r|\n)/g, '%0D'),
    subject: mailData.subject.replace(/ /g, '%20')
  }),
  mounted() {
    console.log(mailData);
  }
};
</script>
