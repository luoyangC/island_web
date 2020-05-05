<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="留言" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage" />

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>

        <v-list three-line subheader>

          <v-subheader>添加留言</v-subheader>
          <v-card flat>
            <v-card-text v-if="currentUser.id">
              <v-textarea v-model="content" auto-grow clearable label="input message" counter="100" />
            </v-card-text>
            <v-card-text v-else>抱歉，添加留言功能需要先登录才能开启</v-card-text>
            <v-card-actions>
              <v-layout v-if="currentUser.id">
                <v-btn rounded depressed @click="addMessage(false, currentUser.id)">直接发送</v-btn>
                <v-btn rounded depressed @click="addMessage(true, currentUser.id)">匿名发送</v-btn>
              </v-layout>
              <v-layout v-else>
                <v-btn rounded depressed nuxt to="/login">点击登录</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>

          <v-subheader>最近留言</v-subheader>
          <v-card v-for="message in messages" :key="message.id" flat>
            <v-list-item avatar>

              <v-list-item-avatar>
                <img :src="message.creator.avatar">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="message.creator.username" />
                <v-list-item-subtitle v-html="message.content" />
              </v-list-item-content>

            </v-list-item>

            <v-divider v-if="message.id != lastMessageId" inset />
          </v-card>
        </v-list>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar" top color="success" auto-height>{{ success }}</v-snackbar>

    <page-bottom prev="/archives" next="/about" prev-name="记录" next-name="关于" />
  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import PageBottom from '@/components/PageBottom'
import { mapGetters } from 'vuex'
export default {
  components: {
    JumbotronCard,
    PageBottom
  },

  asyncData: async({ app }) => {
    const imageId = app.store.getters['app/randomImage'][2] || 100
    const { data: messages } = await app.$api.getMessages()
    return {
      success: '',
      snackbar: false,
      content: '',
      messages: messages.data,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`
    }
  },

  computed: {
    ...mapGetters('app', [
      'parallaxHeight'
    ]),
    ...mapGetters('user', [
      'currentUser'
    ]),
    lastMessageId() {
      return this.messages[this.messages.length - 1].id
    }
  },

  methods: {
    async addMessage(anonymous, user) {
      const { data } = await this.$axios.post(`/message/`, { anonymous, user, content: this.content })
      this.messages.unshift(data)
      this.content = ''
      this.snackbar = true
      this.success = '留言添加成功！'
    }
  }

}
</script>
