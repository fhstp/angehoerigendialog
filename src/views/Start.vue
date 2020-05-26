<template>
  <div class="an-start">
    <img
      src="@/assets/images/background_startscreen.jpg"
      alt="Hände einer alten Person"
      class="an-start__backgroundimage"
    />
    <div class="an-start__logowrapper">
      <img
        src="@/assets/images/logo.png"
        alt="Volkshilfe"
        class="an-start__logo"
      />
      <h1 class="an-start__heading">Angehörigendialog</h1>
    </div>

    <IconV class="an-start__iconv" />
    <div class="an-start__content">
      <div class="an-start__inputwrapper">
        <label for="partner-name">GesprächspartnerIn</label>
        <input id="partner-name" type="text" required />
      </div>

      <div class="an-start__inputwrapper">
        <label for="socialworker-name">Durchgeführt von</label>
        <input id="socialworker-name" type="text" required />
      </div>

      <div class="an-start__inputwrapper">
        <label for="date">Datum</label> <input id="date" type="date" required />
      </div>
      <div>
        <button
          v-if="existingLocalStorage"
          class="btn"
          @click="restartQuestionnaire"
        >
          start
        </button>
        <router-link v-else to="fragebogen" class="btn" start
          >start</router-link
        >
        <router-link v-if="existingLocalStorage" to="fragebogen" class="btn"
          >vorherigen Fragebogen laden</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { restartQuestionnaire } from '@/helpers/form.js';

export default {
  name: 'Start',
  components: {
    IconV: () => import('@/assets/icons/v.svg?inline')
  },
  computed: {
    existingLocalStorage() {
      return localStorage.getItem('vuex');
    }
  },
  methods: {
    restartQuestionnaire
  }
};
</script>

<style lang="scss" scoped>
.an-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;

  &__backgroundimage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 0;
    height: 100vh;
    object-fit: cover;
  }

  &__iconv {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
  }

  &__logo {
    width: 220px;
    margin-bottom: 12px;
  }

  &__logowrapper {
    z-index: 2;
    position: absolute;
    right: 5vw;
    top: 5vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__heading {
    color: white;
    font-size: 2.2rem;
    text-transform: uppercase;
    font-weight: normal;
  }

  &__content {
    position: absolute;
    bottom: 10vw;
    left: 10vw;
    z-index: 3;
    display: flex;
    flex-direction: column;
  }

  &__inputwrapper {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 12px;

    input {
      height: 40px;
      border-radius: $border-radius;
      border: 1.5px solid $color-theme-lightgrey;
    }

    label {
      font-size: 1.5rem;
    }
  }
}
</style>
