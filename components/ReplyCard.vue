<template>
  <v-layout>
    <v-flex>
      <v-card flat class="reply">
        <v-list-item>

          <v-list-item-content>
            <v-list-item-title>
              {{ reply.creator.username }} 回复
              <a router :href="'/user/' + reply.receiver.id">{{ reply.receiver.username }}</a>
            </v-list-item-title>
            <v-list-item-subtitle>{{ reply.update_at | timeFormat }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-layout v-if="reply.is_like" justify-end align-center>
              <v-btn icon small @click.stop="delLike(reply.is_like)">
                <v-icon class="iconfont" color="red">icon-praise_fill</v-icon>
              </v-btn>
              <span>&nbsp;{{ reply.like_nums }}</span>
            </v-layout>

            <v-layout v-else justify-end align-center>
              <v-btn icon small @click.stop="addLike('reply', reply.id)">
                <v-icon class="iconfont">icon-praise</v-icon>
              </v-btn>
              <span>&nbsp;{{ reply.like_nums }}</span>
            </v-layout>
          </v-list-item-action>
        </v-list-item>

        <v-card-text class="reply-content">{{ reply.content }}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    timeFormat(time) {
      return moment(time).format('MMM DD YYYY')
    }
  },
  props: {
    reply: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 点赞
    async addLike(type, id) {
      const { data } = await this.$axios.post(`/like/`, { like_type: type, like_id: id })
      this.reply.like_nums += 1
      this.reply.is_like = data.id
    },
    // 取消点赞
    async delLike(id) {
      await this.$axios.delete(`/like/${id}/`)
      this.reply.like_nums -= 1
      this.reply.is_like = false
    }
  }
}
</script>

<style lang="stylus">
.reply
  .v-list-item
    padding 0 !important
  .v-list__tile
    padding 0 !important
  .v-card__text
    padding 0 !important
  &-content
    padding 0 2px 0 2px
</style>

