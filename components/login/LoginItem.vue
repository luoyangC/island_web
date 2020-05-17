<template>
  <v-card flat tile>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="loginInfo.username"
          :rules="[rules.required]"
          :error-messages="errors.username"
          prepend-icon="person"
          label="用户名或者邮箱"
          type="text"
          validate-on-blur
          @input="initialError"
        />
        <v-text-field
          v-model="loginInfo.password"
          :rules="[rules.required, rules.min, rules.max]"
          :error-messages="errors.password"
          prepend-icon="lock"
          label="账户密码"
          type="password"
          validate-on-blur
          @input="initialError"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout column align-center pl-5 pr-5 pb-5>
        <v-btn
          rounded
          large
          block
          color="primary"
          @click.stop="login"
        >登录</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    loginInfo: {
      username: '',
      password: ''
    },
    rules: {
      required: value => !!value || '该内容不能为空',
      min: value => value.length >= 8 || '最少需要输入8个字符',
      max: value => value.length <= 20 || '最后可以输入20个字符'
    },
    errors: { username: [], password: [] }
  }),
  methods: {
    initialError() {
      this.errors = { username: [], password: [] }
    },
    async login() {
      const { data } = await this.$api.login(this.loginInfo)
      this.$cookies.set('token', data.token)
      this.$store.dispatch('user/setCurrentUser')
      this.$router.go(-1)
    }
  }
}
</script>
