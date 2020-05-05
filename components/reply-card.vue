<template>
  <v-layout>
    <v-flex>
      <v-card flat class="reply">
        <v-list-item avatar>
          <v-list-item-avatar>
            <img :src="reply.from_user.image">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ reply.from_user.username }} 回复
              <a router :href="'/user/' + reply.to_user.id">{{ reply.to_user.username }}</a>
            </v-list-item-title>
            <v-list-item-sub-title>2018.10.1</v-list-item-sub-title>
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

        <v-card-text>{{ reply.content }}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
  .v-list__tile
    padding 0 !important
  .v-card__text
    padding 0 !important
</style>

