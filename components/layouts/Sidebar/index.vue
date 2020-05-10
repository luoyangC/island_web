/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:19:06
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:14:35
 */
<template>
  <v-navigation-drawer :clipped="clipped" :value="drawer" temporary app @input="navigation">
    <!-- 侧栏顶栏 -->
    <toolbar @default="setArticleParams" />
    <!-- 侧栏头像 -->
    <avatar />
    <!-- 侧栏搜索 -->
    <search @search="setArticleParams" />
    <!-- 侧栏工具 -->
    <action />
    <!-- 侧栏导航 -->
    <list @params="setArticleParams" />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import Toolbar from './Toolbar'
import Avatar from './Avatar'
import Search from './Search'
import Action from './Action'
import List from './List'
export default {
  components: {
    Toolbar,
    Avatar,
    Search,
    Action,
    List
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters('app', [
      'drawer',
      'clipped'
    ])
  },
  methods: {
    navigation(e) {
      if (!e) {
        this.$store.dispatch('app/setDrawer', false)
      }
    },
    // 设置文章的过滤参数
    setArticleParams(type, params) {
      let data

      if (type === 'category') {
        data = { category: params, page: 1, limit: 10 }
      } else if (type === 'time') {
        data = { time: params, page: 1, limit: 10 }
      } else if (type === 'search') {
        data = { search: params, page: 1, limit: 10 }
        this.search = ''
      } else if (type === 'default') {
        data = { page: 1, limit: 10 }
      }
      this.$store.dispatch('app/setDrawer', false)
      this.$store.dispatch('article/setParams', data)
      this.$router.push('/inspire')
    }
  }
}
</script>

<style lang="stylus">
.v-navigation-drawer
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important
</style>
