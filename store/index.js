export const actions = {
  async nuxtServerInit({ dispatch, commit }, { store }) {
    const token = store.$cookies.get('token')
    commit('user/SET_TOKEN', token) // 初始化token
    // dispatch('app/initApp') // 初始化应用
  }
}
