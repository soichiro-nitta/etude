module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Etude',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,shrink-to-fit=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Produced by Soichiro Nitta & Kensuke Ohki'
      },
      { name: 'keywords', content: '新田聡一郎,大木健介' },
      { property: 'fb:app_id', content: '654555221603303' },
      {
        property: 'og:description',
        content: 'Produced by Soichiro Nitta & Kensuke Ohki'
      },
      { property: 'og:image', content: 'https://nitta.studio/ogp-0426.jpg' },
      { property: 'og:site_name', content: 'Etude' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@soichiro_nitta' },
      { property: 'twitter:creator', content: '@soichiro_nitta' },
      {
        property: 'twitter:description',
        content: 'Produced by Soichiro Nitta.'
      },
      {
        property: 'twitter:image',
        content: 'https://nitta.studio/ogp-0426.jpg'
      }
    ],
    link: [
      // { rel: 'icon', href: '/icon.png' },
      // { rel: 'apple-touch-icon', href: '/icon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Josefin+Sans:400,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css'
      }
    ]
  },
  css: ['~/assets/css/default.css'],
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#444',
    height: '10px'
  },
  /*
  ** nuxt-modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-device-detect'
  ],
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // find the stylus loader
      const stylus = config.module.rules[0].options.loaders.stylus.find(e => e.loader == 'stylus-loader')
      // extend default options
      Object.assign(stylus.options, {
        import: [
          '~assets/stylus/variables.styl',
          '~assets/stylus/mixins.styl'
        ]
      })
    }
  },
  mode: 'spa'
}
