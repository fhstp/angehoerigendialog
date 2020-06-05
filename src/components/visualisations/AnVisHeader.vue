<template>
  <div class="an-visualisation__infos row">
    <h1 class="col-md-3">
      Angehörigengespräch von<br />{{ headerData.caregivername }}
    </h1>
    <div class="col-md-3">
      <p>
        Durchgeführt von {{ headerData.socialworkername }},
        {{ headerData.date }}
      </p>
      <p>
        Zweitgespräch am {{ headerData.date2 }} um {{ headerData.time2 }} Uhr
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnVisHeader'
};
</script>
