const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  head: {
    titleTemplate: 'Island - %s',
    title: 'Island',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'ISLAND' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.repository.webfont.com/webfonts/nomal/132351/45904/5ec0e978f629d8081cc5e779.css' }
    ],
    script: [
      { src: 'https://at.alicdn.com/t/font_1596119_e24nz6akxf.js', async: true, defer: true },
      { src: 'https://at.alicdn.com/t/font_850611_mche8omg2jq.js', async: true, defer: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    duration: 20000,
    color: '#00838f',
    height: '3px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/app.styl',
    '~/node_modules/highlight.js/styles/a11y-light.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/message', ssr: false },
    { src: '@/plugins/settings', ssr: true },
    { src: '@/plugins/mavon', ssr: false },
    { src: '@/plugins/upload', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
