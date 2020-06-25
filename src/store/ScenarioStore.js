import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const state = {
  scenarios: []
}

let store = new Vuex.Store({
  state,
})

// Variable globale pour les tests
global.store = store

export default store
