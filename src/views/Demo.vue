<template>
  <div class="an-demo">
    <div class="an-demo__lang">
      <h1>Demo Modus</h1>
      <p>
        Durck klicken vom folgenden Button, können Beispiel Daten für die
        Visualisierungen importiert werden.
      </p>
      <button class="btn" @click="importData">Demo Daten importieren</button>
    </div>
    <div class="an-demo__lang">
      <h1>Demo Mode</h1>
      <p>
        By clicking the following button, you can import example data to see the
        visualisations.
      </p>
      <button class="btn" @click="importData">import demo data</button>
    </div>
    <div class="an-demo__mobile-notice">
      <h2>Mobile Support</h2>
      <p>
        Die Visualisierungen sind für Tabblets / Desktop Browser optimiert. Auf
        mobilen Endgeräten könnten manche Sachen nicht funktionieren.
      </p>
      <p>
        The visualisations are optimised for tablet / desktop browsers. Things
        could be broken on mobile devices.
      </p>
    </div>
  </div>
</template>

<script>
import demoData from '@/data/demo.json';

export default {
  name: 'Demo',
  components: {},
  methods: {
    importData() {
      this.$store.commit('importState', demoData);
      this.$router.push('/auswertung');
    }
  }
};
</script>

<style lang="scss" scoped>
.an-demo {
  max-width: 60rem;
  margin: 0 auto;
  display: flex;

  &__lang {
    flex: 1;
    padding: 1rem;
    margin: 1rem;
    background: $color-theme-lightgrey;
  }
  &__mobile-notice {
    display: none;
    padding: 1rem;

    p {
      margin-top: 0.5rem;
    }
  }

  @media (max-width: 50rem) {
    flex-direction: column;

    &__mobile-notice {
      display: block;
    }
  }
}
</style>
