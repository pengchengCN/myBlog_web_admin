import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userObj: {},
    catAry: [],   // 分类
    labAry: []  // 标签
  },
  mutations: {
    SETUSER(state, data) {
      state.userObj = data
    },
    SETCAT(state, data) {
      state.catAry = data
    },
    SETLAB(state, data) {
      state.labAry = data
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('SETUSER', data)
    },
    setCatList({ commit }, data) {
      commit('SETCAT', data)
    },
    setLabList({ commit }, data) {
      commit('SETLAB', data)
    }
  },
  // 取
  getters: {
    getUser: (state) => {
      return state.userObj
    },
    getCatList: (state) => {
      return state.catAry
    },
    getLabList: (state) => {
      return state.labAry
    }
  }
})
