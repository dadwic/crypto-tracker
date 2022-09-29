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
    addSymbol(state, symbol) {
      state.symbols = [...state.symbols, symbol];
    },
    removeSymbol(state, symbol) {
      state.symbols = state.symbols.filter((item) => item.symbol !== symbol);
    },
  },
  actions: {
    addSymbol({ commit }, symbol) {
      commit("addSymbol", symbol);
    },
    removeSymbol({ commit }, symbol) {
      commit("removeSymbol", symbol);
    },
  },
  getters: {
    getBySymbol: (state) => (symbol) => {
      return state.symbols.find((item) => item.symbol === symbol);
    },
  },
  plugins: [new VuexPersistence({ modules: ["symbols"] }).plugin],
});
