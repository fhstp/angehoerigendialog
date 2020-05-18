<template>
  <fieldset class="an-list">
    <button
      v-show="!(fieldMax && listData.length === fieldMax)"
      :disabled="listData.length && !listData[listData.length - 1]"
      class="an-list__add"
      @click="addHandler"
    >
      {{ fieldActiontext }}
    </button>
    <ol v-if="listData.length">
      <li v-for="i in listData.length" :key="i">
        <input
          ref="listItems"
          v-model="listData[i - 1]"
          type="text"
          @keydown.enter="enterHandler(i - 1)"
        />
      </li>
    </ol>
  </fieldset>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnList',
  mixins: [field],
  props: {
    fieldActiontext: { type: String, default: 'Eintrag hinzufügen' },
    fieldMin: { type: Number, default: undefined },
    fieldMax: { type: Number, default: undefined }
  },
  data() {
    return {
      listData: Array(this.fieldMin ?? 1).fill('')
    };
  },
  watch: {
    listData(newList) {
      // remove empty list items at the end
      if (
        newList.length > 1 &&
        newList[newList.length - 1].length === 0 &&
        newList[newList.length - 2].length === 0 &&
        (!this.fieldMin || newList.length > this.fieldMin)
      ) {
        this.listData.splice(newList.length - 1, 1);
      }

      this.field_data =
        newList[newList.length - 1] === ''
          ? newList.slice(0, -1)
          : [...newList];
    }
  },
  created() {
    if (this.field_data?.length) {
      this.listData = [...this.field_data];
      if (this.fieldMin && this.fieldMin > this.field_data.length) {
        this.listData.push(
          Array(this.fieldMin - this.field_data.length).fill('')
        );
      }
    }
  },
  methods: {
    enterHandler(index) {
      // set focus to next input
      if (index < this.listData.length - 1) {
        this.$refs.listItems[index + 1].focus();
      }
      // create new input if no next input
      else if (
        this.listData.length &&
        this.listData[this.listData.length - 1].length > 0 &&
        (!this.fieldMax || this.listData.length < this.fieldMax)
      ) {
        this.listData.push('');
        this.$nextTick(function () {
          this.$refs.listItems[this.$refs.listItems.length - 1].focus();
        });
      }
    },
    addHandler() {
      this.enterHandler(this.listData.length - 1);
    },
    validate(value) {
      let valid = true;
      if (
        (this.fieldMax !== undefined && value?.length >= this.fieldMax) ||
        (this.fieldMin !== undefined && value?.length <= this.fieldMin)
      )
        valid = false;
      this.$emit('update:field_valid', valid);
    }
  }
};
</script>

<style lang="scss" scoped>
.an-list__add {
  margin-bottom: $spacer * 2;
  font-size: 1.1rem;
}

ol {
  list-style-position: inside;
}
</style>
