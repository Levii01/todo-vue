import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

Vue.config.productionTip = false;
console.log('process', process.env)
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: '',
  databaseURL: '',
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: '',
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
