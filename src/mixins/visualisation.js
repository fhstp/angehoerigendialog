export default {
  props: {
    available: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    visualisation_gotVisible: false,
    visualisation_isVisible: false
  }),
  mounted() {
    const observerOptions = {
      root: document.querySelector('.an-visualisation'),
      threshold: 0.75
    };
    const observer = new IntersectionObserver(entries => {
      if (entries?.length > 0) {
        if (entries[0].intersectionRatio >= 0.75) {
          this.visualisation_gotVisible = true;
        }
        this.visualisation_isVisible = entries[0].intersectionRatio >= 0.75;
      }
    }, observerOptions);
    observer.observe(this.$el);
  }
};
