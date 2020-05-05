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
  params: state => state.params
}

export const mutations = {
  SET_PARAMS(state, data) {
    state.params = data
  }
}

export const actions = {
  setParams(context, data) {
    context.commit('SET_PARAMS', data)
  }
}
