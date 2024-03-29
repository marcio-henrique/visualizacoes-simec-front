import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// import router from "./router";
import store from "./store";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");