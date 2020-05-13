<template>
  <div class="circle">
    <div class="shape-left" />
    <div class="shape-right" />
    <div ref="text" class="text">{{ text }}</div>
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
      const circle = this.$el;

      const circleHeight = circle.offsetHeight;
      const text = this.$refs.text;

      let fontSize = window
        .getComputedStyle(text)
        .getPropertyValue('font-size')
        .replace('px', '');

      if (text.offsetHeight < circleHeight) {
        text.style.paddingTop = `${
          (circleHeight - text.offsetHeight) / 2 + fontSize / 2
        }px`;
      }
      while (text.offsetHeight > circleHeight) {
        fontSize -= 0.1;
        text.style.fontSize = `${fontSize}px`;
      }
    }, 1);
  }
};
</script>

<style>
.circle {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fdc823;
  border-radius: 50%;
}

.shape-left,
.shape-right {
  width: 50%;
  height: 100%;
}
.shape-left {
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
  shape-margin: 7%;
}

.shape-right {
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
  shape-margin: 7%;
}

.text {
  text-align: center;
  margin: 0;
}
</style>
