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
    //サイドメニュー
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    //連絡先の投稿
    addAddress( state,{id ,address}) { //アドレスにidが含まれた状態でstoreに格納
      address.id = id
      state.addresses.push(address)
    },
    //連絡先の編集
    updateAddress (state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses[index] = address
    },
    //連絡先の削除
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses.splice(index, 1)
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser',user)
    },
    //firestoreからデータを取得するアクション
    fetchAddresses ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress' , {id: doc.id, address: doc.data() })) //for eachでループしてデータを取り出す
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
      if (getters.uid) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then( doc => {
        commit('addAddress',{ id: doc.id, address })
      })
     }
    },
   // データを更新するアクション
   updateAddress ({ getters, commit }, { id, address}) {
     if (getters.uid) {
       firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
         commit('updateAddress', { id, address })
       })
      }
    },
    deleteAddress ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress', { id })
        })
       }
      }
   },
  // ユーザーとユーザーの画像を取得する
  getters: {
    // stateからデータを取得して加工したデータを返す
    // stateにログインユーザーが存在する場合はdisplayNameを返す
    userName: state => state.login_user ? state.login_user.displayName: '',
    photoURL: state => state.login_user ? state.login_user.photpURL: '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id)
  }
})
