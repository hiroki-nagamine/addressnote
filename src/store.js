import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: []
  },
  mutations: {
    // ログイン機能
    setLoginUser (state, user) {
      state.login_user = user
    },
    // ログアウト機能
    deleteLoginUser (state) {
        state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    addAddress( state,address) {
      state.addresses.push(address)
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser',user)
    },
    delteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    logout () {
      firebase.auth().signOut()
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
     toggleSideMenu ({ commit }) {
       commit('toggleSideMenu')
    },
    addAddress ({ commit }, address) {
      commit('addAddress',address)
    }
  },
  // ユーザーとユーザーの画像を取得する
  getters: {
    // stateからデータを取得して加工したデータを返す
    // stateにログインユーザーが存在する場合はdisplayNameを返す
    userName: state => state.login_user ? state.login_user.displayName: '',
    photoURL: state => state.login_user ? state.login_user.photpURL: ''
  }
})
