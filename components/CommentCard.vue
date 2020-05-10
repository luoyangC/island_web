<template>
  <v-layout justify-center pt-2 pb-2>
    <v-flex>
      <v-card flat>

        <v-list-item>
          <v-list-item-avatar @click="handelExpansion">
            <v-img :src="comment.creator.avatar" />
          </v-list-item-avatar>

          <v-list-item-content @click="setToUser(comment.creator)">
            <v-list-item-title v-text="comment.creator.username" />
            <v-list-item-subtitle>{{ comment.update_at | timeFormat }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-layout v-if="comment.is_like" justify-end align-center>
              <!-- <v-btn icon small @click="delLike(comment.is_like)">
                <v-icon class="iconfont" color="red">icon-praise_fill</v-icon>
              </v-btn> -->
              <span>&nbsp;{{ comment.like_nums }}</span>
            </v-layout>

            <v-layout v-else justify-end align-center>
              <!-- <v-btn icon small @click="addLike('comment', comment.id)">
                <v-icon class="iconfont">icon-praise</v-icon>
              </v-btn> -->
              <span>&nbsp;{{ comment.like_nums }}</span>
            </v-layout>
          </v-list-item-action>
        </v-list-item>

        <v-card-text class="comment-content" @click="setToUser(comment.creator)">{{ comment.content }}</v-card-text>

        <v-card-actions class="comment-content">
          <v-expansion-panel-content v-model="expansion" ripple>
            <!-- <v-card v-if="comment.reply_nums > 0" slot="header" flat>
              <v-icon class="iconfont">icon-comments</v-icon>&nbsp;{{ comment.reply_nums }}&nbsp;查看全部回复
            </v-card>
            <v-card v-else slot="header" flat>
              <v-icon class="iconfont">icon-comments</v-icon>&nbsp;{{ comment.reply_nums }}&nbsp;点击添加回复
            </v-card> -->
            <v-card flat @click.stop>
              <v-layout v-for="item in replies" :key="item.id" v-ripple mb-3 @click.stop="setToUser(item.creator)">
                <reply-card :reply="item" />
              </v-layout>
              <v-text-field v-if="currentUser.id" v-model="reply" :label="'回复 ' + toUser.username" @keyup.enter="addReplay" />
            </v-card>
          </v-expansion-panel-content>
        </v-card-actions>
        <v-layout pr-3>
          <v-divider v-show="!expansion" inset />
        </v-layout>
      </v-card>
    </v-flex>
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
      return moment(time).format('MMM DD YYYY')
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
      toUser: {
        id: null,
        username: null
      },
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
    handelExpansion() {
      this.$emit('update:expansion', this.expansion !== this.index ? this.index : -1)
    },
    // 指定添加回复的接收者
    setToUser(user) {
      this.toUser = user
    },
    // 获取数据
    async getData() {
      // 获取回复列表
      const { data } = await this.$api.getReplies({ comment: this.comment.id })
      this.replies = data.data
    },
    // 点赞
    async addLike(type, id) {
      const { data } = await this.$axios.post(`/like/`, { like_type: type, like_id: id })
      this.comment.like_nums++
      this.comment.is_like = data.id
    },
    // 取消点赞
    async delLike(id) {
      await this.$axios.delete(`/like/${id}/`)
      this.comment.like_nums -= 1
      this.comment.is_like = false
    },
    // 添加回复
    async addReplay() {
      if (!this.toUser.id) {
        this.$message.error('请选择回复人')
        return
      }
      const { data } = await this.$api.addReply({ comment: this.comment.id, receiver_id: this.toUser.id, content: this.reply })
      this.replies.unshift(data.data)
      this.reply = ''
      this.comment.reply_nums += 1
      this.$message.success('回复添加成功！')
    }
  }
}
</script>

<style lang="stylus">
.comment-content
  padding 0 16px 0 72px
  .v-expansion-panel__header
    padding 0 !important
  .v-expansion-panel-content
    width 100%
  .v-expansion-panel-content__wrap
    padding 0
</style>
