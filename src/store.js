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
    //firestoreからデータを取得するアクション
    fetchAddresses ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress' , doc.data())) //for eachでループしてデータを取り出す
      })
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
     toggleSideMenu ({ commit }) {
       commit('toggleSideMenu')
    },
    addAddress ({ getters, commit }, address) {
      if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address)
      commit('addAddress',address)
    }
  },
  // ユーザーとユーザーの画像を取得する
  getters: {
    // stateからデータを取得して加工したデータを返す
    // stateにログインユーザーが存在する場合はdisplayNameを返す
    userName: state => state.login_user ? state.login_user.displayName: '',
    photoURL: state => state.login_user ? state.login_user.photpURL: '',
    uid: state => state.login_user ? state.login_user.uid : null
  }
})
