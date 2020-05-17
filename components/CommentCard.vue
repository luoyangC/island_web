<template>
  <v-layout pb-4>
    <v-card flat width="100%">

      <v-list-item class="comment-info">
        <v-list-item-avatar>
          <v-img :src="comment.creator.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ comment.creator.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ comment.update_at | timeFormat }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="comment-content" @click="setToUser(comment.creator)">{{ comment.content }}</v-card-text>

      <v-card-actions class="comment-action">
        <div class="action-item" @click="handleLike(comment.is_like)">
          <v-btn icon small :color="comment.is_like ? 'red' : ''">
            <v-icon small>mdi-thumb-up</v-icon>
          </v-btn>
          <span class="mr-3">{{ comment.like_nums }}</span>
        </div>
        <div class="action-item" @click="handleShowReply(comment.creator)">
          <v-btn icon small>
            <v-icon small>mdi-message</v-icon>
          </v-btn>
          <span class="mr-3">回复</span>
        </div>
      </v-card-actions>

      <v-layout column class="comment-reply">
        <v-divider />
        <reply-card v-for="item in replies" :key="item.id" mb-3 :reply="item" @showReply="handleShowReply" />
      </v-layout>

      <v-expand-transition>
        <div v-show="showReply" class="comment-input">
          <v-textarea v-model="reply" flat solo outlined hide-details rows="3" :placeholder="placeholder" />
          <v-layout justify-end mt-3>
            <v-btn class="mr-2" rounded depressed color="#ec7259" dark @click="handleSendReply">发布</v-btn>
            <v-btn class="ml-2" rounded outlined color="#999999" @click="handelCancelReply">取消</v-btn>
          </v-layout>
        </div>
      </v-expand-transition>
    </v-card>
  </v-layout>
</template>

<script>
import ReplyCard from '@/components/ReplyCard'
import moment from 'moment'

export default {
  components: {
    ReplyCard
  },
  filters: {
    timeFormat(time) {
      return moment(time).format('YYYY.MM.DD HH:MM')
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: -1
    },
    expansion: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      reply: '',
      showReply: false,
      placeholder: '',
      toUser: { id: null, username: null },
      replies: []
    }
  },
  computed: {
    // 获取当前登录用户
    currentUser() {
      return this.$store.getters['user/currentUser']
    }
  },
  mounted() {
    // 只有在存在回复的情况下才发送请求
    if (this.comment.reply_nums > 0) this.getData()
  },
  methods: {
    handleSendReply() {
      this.addReplay()
      this.showReply = false
    },
    handelCancelReply() {
      this.toUser = { id: null, username: null }
      this.reply = ''
      this.showReply = false
    },
    handleShowReply(user) {
      this.toUser = user
      this.placeholder = `@ ${user.username} `
      this.showReply = true
    },
    handleLike(id) {
      if (id) {
        this.delLike(id)
      } else {
        this.addLike(this.comment.id)
      }
    },
    // 获取数据
    async getData() {
      // 获取回复列表
      const { data } = await this.$api.getReplies({ comment: this.comment.id })
      this.replies = data
    },
    // 点赞
    async addLike(id) {
      const { data } = await this.$api.addLike({ like_type: 'comment', like_id: id })
      this.comment.like_nums++
      this.comment.is_like = data.id
    },
    async delLike(id) {
      await this.$api.delLike(id)
      this.comment.like_nums--
      this.comment.is_like = false
    },
    // 添加回复
    async addReplay() {
      if (!this.toUser.id) {
        this.$message.error('请选择回复人')
        return
      }
      const { data } = await this.$api.addReply({ comment: this.comment.id, receiver_id: this.toUser.id, content: this.reply })
      this.replies.unshift(data)
      this.reply = ''
      this.comment.reply_nums += 1
      this.$message.success('回复添加成功！')
    }
  }
}
</script>

<style lang="stylus">
.comment
  &-info
    .v-list-item__avatar
      margin-right 10px !important
  &-content
    padding 0 16px 0 66px
    font-size: 1.2rem
    color: #404040 !important
  &-action
    padding 0 16px 16px 62px
    margin-top 8px
    .action-item
      display flex
      align-items center
  &-input
    padding 0 16px 0 66px
  &-reply
    padding 0 16px 0 66px
</style>
