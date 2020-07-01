import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
import App from "./App.vue";

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = "localhost:3000/API";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
