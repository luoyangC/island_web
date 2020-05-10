<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg5 xl4 mb-5>
        <v-tabs v-model="active" dark height="300" slider-color="yellow">
          <v-img :src="currentImage" aspect-ratio="2">
            <v-layout fill-height justify-center align-center dark-back>
              <v-tab active-class="active-disabled" :ripple="false">
                <v-btn rounded outlined depressed large>切换登录</v-btn>
              </v-tab>
              <v-tab active-class="active-disabled" :ripple="false">
                <v-btn rounded outlined depressed large>切换注册</v-btn>
              </v-tab>
            </v-layout>
          </v-img>
          <v-tab-item>
            <login-item :active.sync="active" />
          </v-tab-item>
          <v-tab-item>
            <register-item :active.sync="active" />
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import LoginItem from '@/components/login/LoginItem'
import RegisterItem from '@/components/login/RegisterItem'
export default {
  components: {
    LoginItem,
    RegisterItem
  },
  async asyncData({ app }) {
    const imageId = app.store.getters['app/randomImage'][5] || 100
    return {
      active: 0,
      currentImage: `${app.$settings.aliOSS}image/random/${imageId}.png`
    }
  }
}
</script>
