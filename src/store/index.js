import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firstName: "John",
    lastName: "Doe",
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [new VuexPersistence().plugin],
});
