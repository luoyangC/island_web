/*
 * @Author: luoyang
 * @Date: 2019-06-12 14:14:09
 * @Last Modified by:   luoyang
 * @Last Modified time: 2019-06-12 14:14:09
 */
import Vue from 'vue'

const NoticeConstructor = Vue.extend(require('../components/Message.vue').default)

let nId = 1

// 自定义消息提醒插件封装
const Message = (options = {}) => {
  const id = 'notice-' + nId++
  const NoticeInstance = new NoticeConstructor({
    data: options
  })
  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount()
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  document.body.appendChild(NoticeInstance.dom)
  return NoticeInstance.vm
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default ({ app }, inject) => {
  inject('message', Message)
}
