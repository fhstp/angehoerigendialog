<template>
  <div class="an-edit-button">
    <router-link
      class="an-edit-button__button"
      :to="`/fragebogen?step=${sectionId}&field=${fieldId}`"
      ><IconEdit :class="special ? 'white' : ''" />
    </router-link>
  </div>
</template>

<script>
import IconEdit from '@/assets/icons/edit.svg?inline';

export default {
  name: 'AnEditButton',
  components: {
    IconEdit
  },
  props: {
    fieldId: { type: String, default: undefined },
    sectionId: { type: String, default: undefined },
    special: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss" scoped>
.an-edit-button {
  &__button {
    margin-left: 0.5rem;
  }

  @media print {
    display: none;
  }

  svg {
    width: 25px;
    stroke: $color-theme-darkgrey;
    stroke-width: 5px;
  }

  .white {
    stroke: white;
  }
}
</style>
