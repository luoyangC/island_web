<template>
  <v-snackbar
    v-model="visible"
    :color="type | typeColor"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'"
    :vertical="mode === 'vertical'"
    :multi-line="mode === 'multi-line'"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn dark text @click="visible = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Message',
  filters: {
    typeColor(type) {
      const colors = {
        success: '#67C23A',
        warning: '#E6A23C',
        error: '#F56C6C',
        info: '#909399'
      }
      return type ? colors[type] : ''
    }
  },
  data: () => ({
    type: '',
    mode: '',
    visible: false,
    message: 'Hello, I\'m a snackbar',
    timeout: 6000,
    x: null,
    y: 'top'
  })
}
</script>
