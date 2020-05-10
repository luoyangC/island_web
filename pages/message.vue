<template>
  <v-layout column>

    <jumbotron :height="parallaxHeight" title="留言" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage" />

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>

        <v-list three-line subheader>

          <v-subheader>添加留言</v-subheader>
          <v-card flat>
            <v-card-text>
              <v-textarea v-model="content" auto-grow clearable label="请输入留言" counter="100" />
            </v-card-text>
            <v-card-actions>
              <v-layout>
                <v-btn v-if="currentUser.id" rounded depressed class="mr-2" @click="addMessage(false)">直接发送</v-btn>
                <v-btn rounded depressed class="ml-2" @click="addMessage(true)">匿名发送</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>

          <v-subheader>最近留言</v-subheader>
          <v-card v-for="message in messages" :key="message.id" flat>
            <v-list-item>

              <v-list-item-avatar>
                <v-img :src="message.creator.avatar" />
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

    <page-bottom prev="/archives" next="/about" prev-name="记录" next-name="关于" />
  </v-layout>
</template>

<script>
import Jumbotron from '@/components/jumbotron'
import PageBottom from '@/components/PageBottom'
import { mapGetters } from 'vuex'
export default {
  components: {
    Jumbotron,
    PageBottom
  },

  asyncData: async({ app }) => {
    const imageId = app.store.getters['app/randomImage'][2] || 100
    const { data: messages } = await app.$api.getMessages()
    return {
      content: '',
      messages: messages.data,
      currentImage: `${app.$settings.aliOSS}image/random/${imageId}.png`
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
      const { data } = await this.$api.addMessage({ content: this.content, anonymous })
      this.$message.success('留言添加成功！')
      this.messages.unshift(data.data)
    }
  }

}
</script>
