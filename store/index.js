export const actions = {
  async nuxtServerInit({ dispatch }, { store }) {
    const token = store.$cookies.get('token')
    if (token) {
      dispatch('user/setToken', token) // 初始化token
      await dispatch('user/setCurrentUser')
    }
    dispatch('app/initApp') // 初始化应用
    await dispatch('article/initArticle') // 初始化文章数据
  }
}
