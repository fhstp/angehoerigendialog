<template>
  <a
    :href="`mailto:?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`"
    class="an-sendmail btn"
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
    body: encodeURI(mailData.body),
    subject: mailData.subject
  })
};
</script>
