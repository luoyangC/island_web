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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
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
    { src: '@/plugins/axios', ssr: true }
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
  ]
}
