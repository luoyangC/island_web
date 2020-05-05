/*
 * @Author: luoyang
 * @Date: 2019-08-10 13:48:44
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:32:25
 */
<template>
  <v-content>
    <nuxt />
    <!-- <live-card v-if="showLiveCard" /> -->
    <v-fab-transition origin="center center">
      <v-btn v-show="offsetTop > 1000" fixed bottom right fab @click="arrowUp">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
// import LiveCard from '@/components/live-card'
export default {
  name: 'AppMain',
  components: {
    // LiveCard
  },
  computed: {
    ...mapGetters('app', [
      'offsetTop'
    ]),
    showLiveCard() {
      // return this.$route.path !== '/' && !this.$vuetify.breakpoint.xs
      return false
    }
  },
  methods: {
    // 回到顶部
    arrowUp() {
      this.$vuetify.goTo(0, { duration: 500, offset: 0, easing: 'easeInOutCubic' })
    }
  }
}
</script>
