<template>
  <div class="an-balloon-circle">
    <div class="an-balloon-circle__shape-left" />
    <div class="an-balloon-circle__shape-right" />
    <div ref="text" class="an-balloon-circle__text">
      <span ref="textInner">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnBalloonKugel',
  props: {
    text: { type: String, required: true }
  },
  mounted() {
    setTimeout(() => {
      const getComputedStyle = (el, prop) =>
        Number(window.getComputedStyle(el)[prop].replace('px', ''));

      const circleHeight = getComputedStyle(this.$el, 'height');
      const text = this.$refs.text;
      const textInner = this.$refs.textInner;

      let fontSize = getComputedStyle(text, 'font-size');

      if (getComputedStyle(text, 'height') < circleHeight) {
        // add padding until text centred in circle
        let paddingTop = 1;
        while (
          paddingTop + textInner.offsetHeight / 2 <
          this.$el.offsetHeight / 2
        ) {
          text.style.paddingTop = `${paddingTop}px`;
          paddingTop++;
        }
      } else {
        // reduce font size until text fits inside circle
        while (getComputedStyle(text, 'height') > circleHeight) {
          fontSize -= 0.1;
          text.style.fontSize = `${fontSize}px`;
        }
      }
    }, 1);
  }
};
</script>

<style lang="scss" scoped>
.an-balloon-circle {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fdc823;
  border-radius: 50%;

  &__shape-left,
  &__shape-right {
    width: 50%;
    height: 100%;
  }

  &__shape-left {
    float: left;
    shape-outside: polygon(
      0 0,
      98% 0,
      50% 6%,
      23.4% 17.3%,
      6% 32.6%,
      0 50%,
      6% 65.6%,
      23.4% 82.7%,
      50% 94%,
      98% 100%,
      0 100%
    );
    shape-margin: 0%;
  }

  &__shape-right {
    float: right;
    shape-outside: polygon(
      2% 0%,
      100% 0%,
      100% 100%,
      2% 100%,
      50% 94%,
      76.6% 82.7%,
      94% 65.6%,
      100% 50%,
      94% 32.6%,
      76.6% 17.3%,
      50% 6%
    );
    shape-margin: 0%;
  }

  &__text {
    text-align: center;
    margin: 0;
  }
}
</style>
