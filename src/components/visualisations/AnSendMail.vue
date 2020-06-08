<template>
  <a
    :href="`mailto:?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`"
    class="an-sendmail btn btn--text"
    >E-Mail senden</a
  >
</template>

<script>
import mailData from '@/data/mail.json';
export default {
  name: 'AnSendMail',

  data: () => ({
    cc: mailData.cc.join('; '),
    bcc: mailData.bcc.join('; '),
    body: encodeURI(mailData.body),
    subject: mailData.subject
  })
};
</script>
