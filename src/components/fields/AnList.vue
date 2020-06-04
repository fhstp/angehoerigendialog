<template>
  <ol v-if="listData.length" class="an-list">
    <template v-if="!$store.state.printMode">
      <li v-for="i in listData.length" :key="i">
        <input
          ref="listItems"
          v-model="listData[i - 1]"
          type="text"
          @keydown.enter="enterHandler(i - 1)"
          @input="inputHandler($event, i - 1)"
        />
      </li>
    </template>
    <template v-else>
      <li v-for="(item, index) in field_data" :key="index">
        {{ item }}
      </li>
    </template>
  </ol>
</template>

<script>
import field from '@/mixins/field.js';

export default {
  name: 'AnList',
  mixins: [field],
  props: {
    fieldMin: { type: Number, default: undefined },
    fieldMax: { type: Number, default: undefined }
  },
  data: () => ({
    listData: ['']
  }),
  watch: {
    listData(newList) {
      // add next empty entry
      if (
        newList.length > 0 &&
        newList[newList.length - 1].length !== 0 &&
        (!this.fieldMax || newList.length < this.fieldMax)
      ) {
        newList.push('');
      }
      // remove empty entries at the end
      if (
        newList.length > 1 &&
        newList[newList.length - 1].length === 0 &&
        newList[newList.length - 2].length === 0
      ) {
        newList.splice(newList.length - 1, 1);
      }
      this.field_data =
        newList[newList.length - 1].length === 0
          ? newList.slice(0, -1)
          : [...newList];
    }
  },
  created() {
    if (this.field_data?.length) this.listData = [...this.field_data];
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
    inputHandler(event, index) {
      if (this.listData[index].match(/^\s+/)) {
        this.listData[index] = this.listData[index].replace(/^\s/, '');
        this.$nextTick(() => {
          event.target.setSelectionRange(0, 0); // prevent that cursor jumps to the end
        });
      }
    },
    validate(value) {
      let valid = true;
      if (
        value === undefined ||
        value.length === 0 ||
        (this.fieldMax !== undefined && value?.length > this.fieldMax) ||
        (this.fieldMin !== undefined && value?.length < this.fieldMin)
      ) {
        valid = false;
      }
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
  @media screen {
    list-style-position: inside;
  }
}

li:not(:last-child) {
  margin-bottom: $spacer * 2;
}

input {
  border: none;
  border-radius: $border-radius;
  padding: $spacer;

  .an-checkboxes_activefields &,
  .an-field__subfields & {
    @media screen {
      border: 2px solid $color-theme-lightgrey;
    }
  }
}
</style>
