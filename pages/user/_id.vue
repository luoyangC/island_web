<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm8 md6 lg5 xl4 mb-5 mt-2 ml-2 mr-2>

        <v-card flat dark>
          <v-img :src="user.avatar" aspect-ratio="2">
            <v-layout column fill-height justify-center align-center dark-back>
              <v-avatar size="100" color="grey lighten-4">
                <img class="rotate" :src="user.avatar" alt="avatar">
              </v-avatar>
            </v-layout>
          </v-img>
        </v-card>

        <v-card flat>
          <v-card-title class="pl-12">基本用户信息</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field :value="user.username || '必填'" label="用户名称" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-yonghu</v-icon>
                </v-text-field>
                <v-text-field :value="user.email || '未设置'" label="邮箱" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-wangzhan</v-icon>
                </v-text-field>
                <v-text-field :value="user.mobile || '未设置'" label="手机号" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-wangzhan</v-icon>
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
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  async asyncData({ params, app }) {
    const { data: userInfo } = await app.$api.getUserInfoById(params.id)

    return {
      user: userInfo
    }
  }
}
</script>
