<template>
  <v-card flat tile>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="registerInfo.mobile"
          :rules="[rules.required, rules.mobile]"
          :error-messages="errors.mobile"
          type="text"
          label="手机号"
          validate-on-blur
          prepend-icon="email"
          @input="initialError"
        >
          <v-btn
            slot="append"
            small
            depressed
            :disabled="registerInfo.mobile.length !== 11 || codeDisabled"
            @click="getMobileCode"
          >{{ codeMsg }}</v-btn>
        </v-text-field>
        <v-text-field
          v-model="registerInfo.code"
          :rules="[rules.required, rules.code]"
          :error-messages="errors.code"
          type="text"
          label="验证码"
          validate-on-blur
          prepend-icon="visibility"
        />
        <v-text-field
          v-model="registerInfo.password"
          :rules="[rules.required, rules.min, rules.max]"
          type="password"
          label="密码"
          validate-on-blur
          prepend-icon="lock"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout column align-center pl-5 pr-5 mb-5>
        <v-btn
          block
          large
          rounded
          color="primary"
          @click.stop="register"
        >注册</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    registerInfo: {
      mobile: '',
      code: '',
      password: ''
    },
    rules: {
      required: value => !!value || '该内容不能为空',
      min: value => value.length >= 8 || '最少需要输入8个字符',
      max: value => value.length <= 20 || '最后可以输入20个字符',
      code: value => value.length === 6 || '输入验证码不合法',
      mobile: value => /^1[3456789]\d{9}$/.test(value) || '手机号不合法'
    },
    errors: { mobile: [], code: [] },
    codeMsg: '获取验证码',
    codeDisabled: false,
    countdown: 60,
    timer: null
  }),

  methods: {
    initialError() {
      this.errors = { mobile: [], code: [] }
    },
    async getMobileCode() {
      if (this.timer) return
      this.codeDisabled = true
      await this.$api.getMobileCode({ mobile: this.registerInfo.mobile, type: 1 })
      this.$message.success('验证码发送成功，请注意查收！')
      this.timer = setInterval(() => {
        if (this.countdown > 0 && this.countdown <= 60) {
          this.countdown--
          if (this.countdown !== 0) {
            this.codeMsg = `重新发送(${this.countdown})`
          } else {
            clearInterval(this.timer)
            this.codeMsg = '获取验证码'
            this.countdown = 60
            this.timer = null
            this.codeDisabled = false
          }
        }
      }, 1000)
    },
    async register() {
      await this.$api.register(this.registerInfo)
      this.$message.success('恭喜您注册成功！！！')
      this.$emit('update:active', 0)
    }
  }
}
</script>
