/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:05:43
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:34:16
 */
<template>
  <v-app-bar color="transparent" :dark="outParallax" flat fixed>
    <v-app-bar-nav-icon :style="style" @click="handleSide" />
    <v-spacer />
    <v-btn v-if="showAddBtn" text small nuxt to="/content"><v-icon left>mdi-pencil</v-icon>写博客</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppToolbar',
  computed: {
    ...mapGetters('app', [
      'offsetTop',
      'windowSize',
      'clipped',
      'drawer'
    ]),
    ...mapGetters('user', [
      'currentUser'
    ]),
    outParallax() { // 计算滚动高度是否低于顶部图片高度
      const height = (this.windowSize.x + this.windowSize.y) / 4
      if (this.offsetTop < height - 10) return true
      return false
    },
    showAddBtn() {
      return this.currentUser.id && !this.$route.name.includes('content')
    },
    style() {
      return { 'color': (this.$route.name === 'index' || this.$route.name === 'content') ? '#000' : '' }
    }
  },
  methods: {
    handleSide() {
      this.$store.dispatch('app/setDrawer', !this.drawer)
    }
  }
}
</script>
