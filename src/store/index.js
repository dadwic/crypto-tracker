import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    symbols: [],
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setSymbols(state, data) {
      state.symbols = [...state.symbols, ...data];
    },
    removeSymbol(state, symbol) {
      state.symbols = state.symbols.filter((item) => item.symbol !== symbol);
    },
  },
  actions: {
    setSymbols({ commit }, data) {
      commit("setSymbols", data);
    },
    removeSymbol({ commit }, symbol) {
      commit("removeSymbol", symbol);
    },
  },
  getters: {},
  plugins: [new VuexPersistence({ modules: ["symbols"] }).plugin],
});
