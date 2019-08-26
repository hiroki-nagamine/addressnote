import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB_yx55RLy2s63H0jzb50lewa9HwZ2ALuk",
    authDomain: "my-address-note.firebaseapp.com",
    databaseURL: "https://my-address-note.firebaseio.com",
    projectId: "my-address-note",
    storageBucket: "",
    messagingSenderId: "56034622672",
    appId: "1:56034622672:web:c33a06f278f16e8c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
