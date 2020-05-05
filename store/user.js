/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:21:19
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 15:51:36
 */
export const state = () => ({
  currentUser: { id: null, image: 'https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/xigua.png' },
  token: ''
})

export const getters = {
  currentUser: state => state.currentUser,
  token: state => state.token
}

export const mutations = {
  SET_CURRENT_USER(state, data) {
    state.currentUser = data
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  setCurrentUser(context, data) {
    context.commit('SET_CURRENT_USER', data)
  }
}
