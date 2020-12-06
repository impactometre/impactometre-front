import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
import App from "./App.vue";

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = process.env.VUE_APP_API_URL;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
