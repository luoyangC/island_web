/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:01:30
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:25:36
 */

// 根据时间自动切换夜间模式
const autoDark = () => {
  const now = new Date()
  const hours = now.getHours()
  if (hours <= 6 || hours <= 18) {
    return false
  } else {
    return true
  }
}

export const state = () => ({
  clipped: false,
  drawer: false,
  them: 'them-default',
  fontFamily: 'font-default',
  dark: false,
  fontSize: 14,
  offsetTop: 0,
  randomImage: [],
  windowSize: { x: 0, y: 0 }
})

export const getters = {
  drawer: state => state.drawer,
  clipped: state => state.clipped,
  dark: state => state.dark,
  them: state => state.them,
  fontFamily: state => state.fontFamily,
  windowSize: state => state.windowSize,
  randomImage: state => state.randomImage,
  offsetTop: state => state.offsetTop,
  fontSize: state => state.fontSize,
  parallaxHeight: state => (state.windowSize.x + state.windowSize.y) / 4
}

export const mutations = {
  SET_THEM(state, data) {
    state.them = data
  },
  SET_FONT_FAMILY(state, data) {
    state.fontFamily = data
  },
  SET_DARK(state, data) {
    state.dark = data
  },
  SET_WINDOW_SIZE(state, data) {
    state.windowSize = data
  },
  SET_RANDOM_IMAGE(state, data) {
    state.randomImage = data
  },
  SET_OFFSET_TOP(state, data) {
    state.offsetTop = data
  },
  SET_FONT_SIZE(state, data) {
    state.fontSize = data
  },
  SET_DRAWER(state, data) {
    state.drawer = data
  }
}

export const actions = {
  initApp({ dispatch }) {
    dispatch('setRandomImage')
    dispatch('setThem', 0)
  },
  setWindowSize({ commit }, data) {
    commit('SET_WINDOW_SIZE', data)
  },
  setRandomImage({ commit }) {
    const randomImage = []
    for (let index = 0; index < 10; index++) {
      randomImage.push(Math.floor(Math.random() * 200))
    }
    commit('SET_RANDOM_IMAGE', randomImage)
  },
  setOffsetTop({ commit }, data) {
    commit('SET_OFFSET_TOP', data)
  },
  setFontSize({ commit }, data) {
    commit('SET_FONT_SIZE', data)
  },
  setFontFamily({ commit }, data) {
    let fontFamily = 'font-default'
    if (data === 1) {
      fontFamily = 'font-Serif'
    } else if (data === 2) {
      fontFamily = 'font-mono'
    }
    commit('SET_FONT_FAMILY', fontFamily)
  },
  setDrawer({ commit }, data) {
    commit('SET_DRAWER', data)
  },
  setThem({ commit }, data) {
    let them = ''
    let dark = false
    if (data === 1) {
      dark = false
      them = 'them-default'
    } else if (data === 2) {
      dark = true
      them = 'them-medium'
    } else if (data === 3) {
      dark = false
      them = 'them-height'
    } else {
      dark = autoDark()
    }
    commit('SET_THEM', them)
    commit('SET_DARK', dark)
  }
}
