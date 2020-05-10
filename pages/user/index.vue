<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm8 md6 lg5 xl4 mb-5 mt-2 ml-2 mr-2>

        <v-card flat dark>
          <v-img :src="userInfo.avatar" aspect-ratio="2">
            <v-layout column fill-height justify-center align-center dark-back>
              <v-layout justify-center align-center>
                <v-avatar size="100" color="grey lighten-4">
                  <img class="rotate" :src="userInfo.avatar" alt="avatar">
                </v-avatar>
              </v-layout>
              <v-layout justify-center align-center>
                <v-btn rounded outlined depressed large class="mr-2" @click="logout">注销</v-btn>
                <v-btn rounded outlined depressed large class="ml-2" @click="modify">修改</v-btn>
              </v-layout>
            </v-layout>
          </v-img>
        </v-card>

        <v-card flat>
          <v-card-title class="pl-12">基本用户信息</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field v-model="userInfo.username" label="用户名称">
                  <v-icon slot="prepend" class="iconfont" size="24">icon-yonghu</v-icon>
                </v-text-field>
                <v-text-field v-model="userInfo.email" label="邮箱" disabled>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-email</v-icon>
                </v-text-field>
                <v-text-field v-model="userInfo.mobile" label="手机号" disabled>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-mobile</v-icon>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

      </v-flex>

    </v-layout>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    userInfo: {}
  }),
  created() {
    this.userInfo = {
      ...this.$store.getters['user/currentUser']
    }
  },
  methods: {
    async logout() {
      this.$cookies.remove('token')
      this.$store.dispatch('user/logout')
      this.$router.go(-1)
    },
    async modify() {
      await this.$api.updateUserInfo(this.userInfo.id, this.userInfo)
      this.$message.success('恭喜您修改成功！！！')
    }
  }
}
</script>
