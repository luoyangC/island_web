<template>
  <v-app v-scroll="onScroll" v-resize="onResize" :style="fontStyle" :class="[them, fontFamily]">
    <!-- app顶栏 -->
    <Header />
    <!-- app侧边栏 -->
    <Sidebar />
    <!-- app主体 -->
    <app-main />
    <!-- app底栏 -->
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppMain, Sidebar, Header, Footer } from '@/components/layouts'
export default {
  components: {
    AppMain,
    Sidebar,
    Header,
    Footer
  },
  computed: {
    ...mapGetters('app', [
      'fontFamily',
      'fontSize',
      'them',
      'dark'
    ]),
    fontStyle() {
      return `font-size: ${this.fontSize}px`
    }
  },
  watch: {
    dark: {
      handler(val) {
        this.$vuetify.theme.dark = val
      },
      immediate: true
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    // 页面滚动时回调函数
    onScroll(e) {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.$store.dispatch('app/setOffsetTop', offsetTop)
    },
    // 窗口改变时回调函数
    onResize() {
      const windowSize = { x: window.innerWidth, y: window.innerHeight }
      this.$store.dispatch('app/setWindowSize', windowSize)
    }
  }
}
</script>

<style lang="stylus">
.font-default
  font-family -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol
.font-Serif
  font-family Lyon-Text, Georgia, KaiTi, STKaiTi, '华文楷体', KaiTi_GB2312, '楷体_GB2312', serif
.font-mono
  font-family Nitti, Microsoft YaHei, '微软雅黑', monospace

.them-default
  background-color #fff !important
.them-medium
  background-image url('~assets/images/dark.png') !important
  background-attachment fixed
.them-height
  background-image url('~assets/images/light.png') !important
  background-attachment fixed
</style>
