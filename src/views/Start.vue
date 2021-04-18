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
        <a
          href="https://www.volkshilfe.at/"
          title="Zur Webseite der Volkshilfe"
          target="__blank"
        >
          <img
            src="@/assets/icons/logo.svg"
            alt="Logo der Pflegeorganisation"
            class="an-start__po-logo"
          />
        </a>
        <h1 class="an-start__an-logo">
          <IconTextLogo aria-label="Angehörigendialog" />
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
            <input
              id="date"
              v-model="date"
              type="date"
              placeholder="dd.mm.yyyy"
            />
          </div>
        </div>
        <div class="an-start__buttons">
          <component
            :is="existingQuestionnaire ? 'button' : 'router-link'"
            class="btn"
            :to="!existingQuestionnaire ? { name: 'Fragebogen' } : undefined"
            @click="existingQuestionnaire ? startNew() : undefined"
          >
            <span>Start</span>
            <IconStart class="yellow--fill" />
          </component>
          <router-link
            v-if="existingQuestionnaire"
            class="btn"
            :to="{ name: 'Fragebogen' }"
          >
            <span>Vorherigen Fragebogen laden</span>
            <IconBack class="yellow--fill" />
          </router-link>
        </div>
      </div>
      <router-link class="an-start__links" to="/legal"
        >Impressum und Datenschutz</router-link
      >
    </div>
  </div>
</template>

<script>
import IconTextLogo from '@/assets/icons/text-logo.svg?inline';
import IconStart from '@/assets/icons/start.svg?inline';
import IconBack from '@/assets/icons/back.svg?inline';

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
    IconV: () => import('@/assets/icons/icon.svg?inline'),
    IconTextLogo,
    IconStart,
    IconBack
  },
  computed: {
    caregivername: fieldGenerator('startseite-angehoerigenname'),
    date: fieldGenerator('startseite-datum'),
    socialworkername: fieldGenerator('startseite-sozialarbeitername')
  },
  created() {
    this.existingQuestionnaire = localStorage.getItem('vuex')?.length > 0;

    this.date = new Date().toISOString().slice(0, 10);
  },
  methods: {
    startNew() {
      this.$swal({
        title: 'Information',
        text:
          'Möchten Sie den vorherigen Fragebogen wirklich überschreiben/löschen?',
        showCancelButton: true,
        confirmButtonText: `Ja`,
        cancelButtonText: `Nein`,
        focusCancel: true,
        showCloseButton: true,
        customClass: {
          container: 'an-start__restart-dialog'
        }
      }).then(result => {
        if (result.isConfirmed) {
          const temp = [this.caregivername, this.date, this.socialworkername];
          this.$store.commit('resetState');
          this.caregivername = temp[0];
          this.date = temp[1];
          this.socialworkername = temp[2];
          this.$router.push({ name: 'Fragebogen' });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.an-start {
  padding: 5vh 5vw;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: auto;
  overflow-x: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    position: relative;
  }

  &__header {
    display: flex;
    margin-bottom: $spacer * 4;
    flex-direction: column;
    align-items: flex-end;
    align-self: flex-end;
    flex-grow: 1;
  }

  &__po-logo {
    max-width: 100%;
    width: 220px;
    margin-bottom: $spacer;
  }

  &__an-logo {
    color: white;
    font-size: 2.2rem;
    text-transform: uppercase;
    font-weight: normal;

    > svg {
      fill: white;
      max-height: 2rem;
      width: 100%; // Chrome won't show otherwise
    }
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    margin-left: -25px;
    margin-right: -25px;
    > * {
      margin-left: 25px;
      margin-right: 25px;
    }
  }

  &__buttons {
    flex-grow: 1;
  }

  &__buttons > * {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    border-radius: 50px;
    margin: 0;
    padding-left: $spacer * 2;
    padding-right: 0;
    height: 60px;
    max-width: 320px;
    width: 100%;
    font-weight: 700;

    > svg {
      margin-left: $spacer;
      height: calc(100% + #{$spacer * 2});
      flex-shrink: 0;
      fill: $color-theme-yellow;
    }

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__space {
    margin-top: 10px;
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
    margin-bottom: 20px;
    display: block;
    flex-direction: column;
    padding: $spacer * 3;
    border: 1.5px solid $color-theme-lightgrey;
    background-color: white;
    width: 320px;
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

  &__links {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: flex-end;
    color: white;
    text-shadow: 0 0 10px black;
    margin-top: 15px;
  }

  &__restart-dialog button {
    color: $color-theme-darkgrey !important;

    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }
}
</style>
