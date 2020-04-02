module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      exclude: [/_redirects/]
    }
  }
};
