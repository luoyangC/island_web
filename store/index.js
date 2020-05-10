export const actions = {
  async nuxtServerInit({ dispatch }, { store }) {
    const token = store.$cookies.get('token')
    if (token) {
      dispatch('user/setCurrentUser')
      dispatch('user/setToken', token) // 初始化token
    }
    dispatch('app/initApp') // 初始化应用
  }
}
