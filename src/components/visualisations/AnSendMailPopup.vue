<template>
  <div v-if="show" class="an-sendmailpopup hide-print">
    <div class="an-sendmailpopup__popup">
      <p>Das exportierte PDF kann jetzt als E-Mail Anhang verschickt werden.</p>
      <div class="an-sendmailpopup__actions">
        <button class="btn" @click="closePopup">Schließen</button>
        <AnSendMail class="btn" @click.native="closePopup" />
      </div>
    </div>
    <div class="an-sendmailpopup__backdrop" @click="closePopup"></div>
  </div>
</template>

<script>
import AnSendMail from '@/components/visualisations/AnSendMail.vue';

export default {
  name: 'AnSendMailPopup',
  components: {
    AnSendMail
  },
  data: () => ({
    show: false
  }),
  watch: {
    '$store.state.printMode'(newValue, oldValue) {
      if (newValue !== oldValue && newValue === false) {
        if (this.$route.path === '/auswertung') {
          this.show = true;
        }
      }
    }
  },
  methods: {
    closePopup() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.an-sendmailpopup {
  &__popup {
    height: 10rem;
    width: 20rem;
    padding: 1rem;
    position: fixed;
    top: calc(50% - 5rem);
    left: calc(50% - 10rem);
    z-index: 1001;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
  }

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__backdrop {
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
  }
}
</style>
