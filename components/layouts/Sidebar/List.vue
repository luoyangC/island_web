/*
 * @Author: luoyang
 * @Date: 2019-08-10 16:56:18
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:15:01
 */
<template>
  <v-list color="transparent">

    <v-list-item to="/inspire" router exact>
      <v-list-item-action>
        <v-icon>home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="text-center pr-5">首页</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action />
    </v-list-item>

    <v-list-group prepend-icon="bookmarks">
      <v-list-item slot="activator">
        <v-list-item-title class="text-center">归档</v-list-item-title>
      </v-list-item>

      <v-list-item v-for="(item, i) in archives" :key="i" router exact @click="handleParams('time', item.archive)">
        <v-list-item-content>
          <v-list-item-title class="text-center" v-text="item.archive" />
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <v-list-group prepend-icon="ballot">
      <v-list-item slot="activator">
        <v-list-item-title class="text-center">分类</v-list-item-title>
      </v-list-item>

      <v-list-item v-for="(item, i) in categories" :key="i" :to="item.to" router exact @click="handleParams('category', item.id)">
        <v-list-item-content>
          <v-list-item-title class="text-center" v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list-group>

    <v-list-item v-for="(item, i) in pages" :key="i" :to="item.to" router exact>
      <v-list-item-action>
        <v-icon v-html="item.icon" />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="text-center pr-5" v-text="item.title" />
      </v-list-item-content>
      <v-list-item-action />
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavbarList',
  data: () => ({
    pages: [
      { icon: 'event_note', title: '记录', to: '/archives' },
      { icon: 'chat', title: '留言', to: '/message' },
      { icon: 'recent_actors', title: '关于', to: '/about' }
    ]
  }),
  computed: {
    ...mapGetters('article', [
      'categories',
      'archives'
    ])
  },
  methods: {
    handleParams(type, data) {
      this.$emit('params', type, data)
    }
  }
}
</script>
