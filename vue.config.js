module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  },
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    }
  }
};
