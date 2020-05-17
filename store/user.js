/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:21:19
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 15:51:36
 */
export const state = () => ({
  currentUser: { id: null, avatar: '' },
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
  async setCurrentUser({ commit }) {
    const { data } = await this.$api.getUserInfo()
    commit('SET_CURRENT_USER', data)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_CURRENT_USER', { id: null, avatar: '' })
  }
}
