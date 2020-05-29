<template>
  <div class="an-start">
    <div class="an-start__background">
      <picture>
        <source
          srcset="@/assets/images/background_startscreen.webp"
          type="image/webp"
        />
        <img
          src="@/assets/images/background_startscreen.jpg"
          alt="Hände einer alten Person"
          class="an-start__backgroundimage"
        />
      </picture>
      <IconV class="an-start__iconv" />
    </div>

    <div class="an-start__content">
      <div class="an-start__header">
        <img
          src="@/assets/images/logo.png"
          alt="Volkshilfe"
          class="an-start__vh-logo"
        />
        <h1 class="an-start__an-logo">
          <IconTextLogo class="icon-text-logo" aria-label="Angehörigendialog" />
        </h1>
      </div>

      <div class="an-start__form">
        <div class="an-start__inputbackground">
          <div class="an-start__inputwrapper">
            <label for="caregiver-name">GesprächspartnerIn</label>
            <input id="caregiver-name" v-model="caregivername" autofocus />
          </div>

          <div class="an-start__inputwrapper">
            <label for="socialworker-name">Durchgeführt von</label>
            <input id="socialworker-name" v-model="socialworkername" />
          </div>

          <div class="an-start__inputwrapper">
            <label for="date">Datum</label>
            <input id="date" v-model="date" type="date" />
          </div>
        </div>
        <div>
          <router-link
            v-if="!existingQuestionnaire"
            to="fragebogen"
            class="btn an-start__startbutton"
            start
            >Start</router-link
          >
          <template v-else>
            <button
              class="btn an-start__startbutton"
              @click="restartQuestionnaire"
            >
              Start
            </button>
            <router-link to="fragebogen" class="btn an-start__previousbutton"
              >Vorherigen Fragebogen laden</router-link
            >
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { restartQuestionnaire } from '@/helpers/form.js';
import IconTextLogo from '@/assets/icons/text-logo.svg?inline';

const fieldGenerator = field_id => ({
  get() {
    return this.$store.getters.getFieldValue(field_id);
  },
  set(value) {
    this.$store.commit('updateAnswerValue', {
      fieldId: field_id,
      value
    });
  }
});

export default {
  name: 'Start',
  components: {
    IconV: () => import('@/assets/icons/v.svg?inline'),
    IconTextLogo
  },
  computed: {
    date: fieldGenerator('startseite-datum'),
    caregivername: fieldGenerator('startseite-angehoerigenname'),
    socialworkername: fieldGenerator('startseite-sozialarbeitername')
  },
  created() {
    this.existingQuestionnaire = localStorage.getItem('vuex')?.length > 0;

    this.date = new Date().toISOString().slice(0, 10);
  },
  methods: {
    restartQuestionnaire
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
  padding: 5vh 5vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  &__header {
    display: flex;
    margin-bottom: $spacer * 4;
    flex-direction: column;
    align-items: flex-end;
    align-self: flex-end;
    flex-grow: 1;
  }

  &__vh-logo {
    max-width: 100%;
    width: 220px;
    margin-bottom: $spacer * 2;
  }

  &__an-logo {
    color: white;
    font-size: 2.2rem;
    text-transform: uppercase;
    font-weight: normal;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
  }

  &__startbutton {
    text-transform: uppercase;
    font-weight: bold;
  }

  &__background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: -1;
  }

  &__backgroundimage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: $color-theme-darkgrey;
  }

  &__iconv {
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
