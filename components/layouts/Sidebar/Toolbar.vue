/*
 * @Author: luoyang
 * @Date: 2019-08-10 16:58:36
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 16:15:54
 */
<template>
  <v-layout mt-1>
    <v-btn absolute right fab text @click="handleClose">
      <v-icon>clear_all</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'NavbarToolbar',
  methods: {
    handleClose() {
      this.$store.dispatch('app/setDrawer', false)
    }
  }
}
</script>
