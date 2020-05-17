/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:01:30
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 15:51:44
 */
export const state = () => ({
  params: {
    page: 1,
    limit: 10
  },
  categories: [],
  archives: []
})

export const getters = {
  params: state => state.params,
  categories: state => state.categories,
  archives: state => state.archives
}

export const mutations = {
  SET_PARAMS(state, data) {
    state.params = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_ARCHIVES(state, data) {
    state.archives = data
  }
}

export const actions = {
  initArticle({ dispatch }) {
    dispatch('setCategories')
    dispatch('setArchives')
  },
  async setCategories({ commit }) {
    const { data: categories } = await this.$api.getCategories()
    commit('SET_CATEGORIES', categories)
  },
  async setArchives({ commit }) {
    const { data: archives } = await this.$api.getArchives()
    this.archives = archives
    commit('SET_ARCHIVES', archives)
  },
  setParams({ commit }, data) {
    commit('SET_PARAMS', data)
  }
}
