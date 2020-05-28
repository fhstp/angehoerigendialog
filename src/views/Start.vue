<template>
  <div class="an-start">
    <div class="an-start__background">
      <picture>
        <source srcset="@/assets/images/background_startscreen.webp" />
        <img
          src="@/assets/images/background_startscreen.jpg"
          alt="Hände einer alten Person"
          class="an-start__backgroundimage"
        />
      </picture>
      <IconV class="an-start__iconv" />
    </div>
    <div class="an-start__logowrapper">
      <img
        src="@/assets/images/logo.png"
        alt="Volkshilfe"
        class="an-start__logo"
      />
      <h1 class="an-start__heading">
        <IconTextLogo class="icon-text-logo" aria-label="Angehörigendialog" />
      </h1>
    </div>

    <div class="an-start__content">
      <div class="an-start__inputbackground">
        <div class="an-start__inputwrapper">
          <label for="caregiver-name">GesprächspartnerIn</label>
          <input
            id="caregiver-name"
            v-model="caregivername"
            type="text"
            autofocus
          />
        </div>

        <div class="an-start__inputwrapper">
          <label for="socialworker-name">Durchgeführt von</label>
          <input
            id="socialworker-name"
            v-model="socialworkername"
            type="text"
          />
        </div>

        <div class="an-start__inputwrapper">
          <label for="date">Datum</label>
          <input id="date" v-model="date" type="date" />
        </div>
      </div>
      <div>
        <button
          v-if="existingLocalStorage"
          class="btn an-start__startbutton"
          @click="restartQuestionnaire"
        >
          Start
        </button>
        <router-link v-else to="fragebogen" class="btn" start
          >start</router-link
        >
        <router-link
          v-if="existingLocalStorage"
          to="fragebogen"
          class="btn an-start__previousbutton"
          >Vorherigen Fragebogen laden</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { restartQuestionnaire } from '@/helpers/form.js';
import IconTextLogo from '@/assets/icons/text-logo.svg?inline';

export default {
  name: 'Start',
  components: {
    IconV: () => import('@/assets/icons/v.svg?inline'),
    IconTextLogo
  },
  computed: {
    existingLocalStorage() {
      return localStorage.getItem('vuex');
    },
    date: {
      get() {
        return this.getFromStore('startseite-datum');
      },
      set(value) {
        this.pushToStore(value, 'startseite-datum');
      }
    },
    caregivername: {
      get() {
        return this.getFromStore('startseite-angehoerigenname');
      },
      set(value) {
        this.pushToStore(value, 'startseite-angehoerigenname');
      }
    },
    socialworkername: {
      get() {
        return this.getFromStore('startseite-sozialarbeitername');
      },
      set(value) {
        this.pushToStore(value, 'startseite-sozialarbeitername');
      }
    }
  },
  created() {
    this.date = new Date().toISOString().slice(0, 10);
  },
  methods: {
    restartQuestionnaire,
    pushToStore(value, field_id) {
      this.$store.commit('updateAnswerValue', {
        fieldId: field_id,
        value
      });
    },
    getFromStore(field_id) {
      return this.$store.getters.getFieldValue(field_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-text-logo {
  fill: white;
  max-height: 2rem;
  width: 100%; // Chrome won't show otherwise
}

.an-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;

  &__background {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: fixed;
  }

  &__backgroundimage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: $color-theme-darkgrey;
  }

  &__iconv {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 50%;
    height: 100%;
    transform: translateX(50%);
    @media #{map-get($query, 'lg-and-up')} {
      right: -35px;
      transform: translateX(0);
    }
  }

  &__logo {
    max-width: 100%;
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
    left: auto;
    z-index: 3;
    display: flex;
    flex-direction: column;
    @media #{map-get($query, 'md-and-up')} {
      left: 10vw;
    }
  }

  &__startbutton {
    text-transform: uppercase;
    font-weight: bold;
  }

  &__previousbutton {
  }

  &__inputbackground {
    padding: $spacer * 3;
    border-radius: $border-radius;
    border: 1.5px solid $color-theme-lightgrey;
    background-color: white;
  }

  &__inputwrapper {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: $spacer * 2;

    input {
      transition: box-shadow 150ms linear;
      height: 40px;
      border-radius: $border-radius;
      border: 1.5px solid $color-theme-lightgrey;
      outline: none;
      padding: 3px 7px;
      &:focus {
        box-shadow: 0 0 3px 2px $color-theme-lightred;
      }
    }

    label {
      font-size: 1.5rem;
      margin-bottom: $spacer;
    }
  }
}
</style>
