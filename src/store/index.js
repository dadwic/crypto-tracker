import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import symbols from "./symbols";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    symbols,
    portfolio: [],
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [new VuexPersistence().plugin],
});
