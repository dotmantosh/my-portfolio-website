import Vue from 'vue'
import Vuex from 'vuex'
import createPesistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPesistedState()],
  state: {
    token: null,
    user: null,
    personalInfo: null,
    workInfo: null,
    oneWorkInfo: null,
    socialMedia: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setPersonalInfo(state, personalInfo) {
      state.personalInfo = personalInfo
    },
    setWorkInfo(state, workInfo) {
      state.workInfo = workInfo
    },
    setSocialMedia(state, socialMedia) {
      state.socialMedia = socialMedia
    },
    setOneWorkInfo(state, oneWorkInfo) {
      this.state.oneWorkInfo = oneWorkInfo
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setPersonalInfo({ commit }, personalInfo) {
      commit('setPersonalInfo', personalInfo)
    },
    setWorkInfo({ commit }, workInfo) {
      commit('setWorkInfo', workInfo)
    },
    setSocialMedia({ commit }, socialMedia) {
      commit('setSocialMedia', socialMedia)
    },
    setOneWorkInfo({ commit }, oneWorkInfo) {
      commit('setOneWorkInfo', oneWorkInfo)
    }
  }
})