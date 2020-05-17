<template>
  <v-layout column>
    <v-card flat width="100%" class="reply pt-5 pb-4">

      <v-list-item class="reply-info">
        <v-list-item-avatar>
          <v-img :src="reply.creator.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ reply.creator.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ reply.update_at | timeFormat }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="reply-content"><a router :href="'/user/' + reply.receiver.id">@ {{ reply.receiver.username }} </a>{{ reply.content }}</v-card-text>

      <v-card-actions class="reply-action">
        <div class="action-item" @click="handleShowReply(reply.creator)">
          <v-btn icon small>
            <v-icon small>mdi-message</v-icon>
          </v-btn>
          <span class="mr-3">回复</span>
        </div>
      </v-card-actions>
    </v-card>
    <v-divider />
  </v-layout>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    timeFormat(time) {
      return moment(time).format('YYYY.MM.DD HH:MM')
    }
  },
  props: {
    reply: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleShowReply(user) {
      this.$emit('showReply', user)
    }
  }
}
</script>

<style lang="stylus">
.reply
  &-info
    padding 0
    .v-list-item__avatar
      margin-right 10px !important
  &-content
    padding 0 16px 0 0
    font-size: 1.2rem
    color: #404040 !important
  &-action
    padding 0 16px 0 0
    margin-top 8px
    margin-left -5px
    .action-item
      display flex
      align-items center
</style>

