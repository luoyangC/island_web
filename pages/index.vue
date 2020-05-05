<template>
  <v-layout align-center justify-center fill-height>
    <v-card color="transparent" flat>
      <v-card-title>
        <v-layout column mb-2>
          <v-layout align-center align-text sentence-font>
            醉后不知天在水<br>
            满船清梦压星河<br>
          </v-layout>
          <v-layout align-center justify-center>
            <img height="30" width="30" :src="logo">
          </v-layout>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-space-around pt-2>
          <v-btn rounded outlined depressed :href="github" class="mr-3">GitHub</v-btn>
          <v-btn rounded outlined depressed nuxt to="/inspire" class="ml-3">Start</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      logo: 'https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/yinzhang.png',
      github: 'https://github.com/luoyangC/luoyangc_nuxt'
    }
  }
}
</script>

<style lang="stylus" scoped>
.align-text {
  -webkit-writing-mode vertical-rl
  writing-mode vertical-rl
  padding-bottom 30px
  font-size 2.0em
  line-height 1.2
}

@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_pmeh1houuy9.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_pmeh1houuy9.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_pmeh1houuy9.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_pmeh1houuy9.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_pmeh1houuy9.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_pmeh1houuy9.svg#杨任东竹石体-Bold') format('svg'); /* iOS 4.1- */
}

.sentence-font {
  font-family: 'webfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
