import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    symbols: []
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setSymbols(state, symbols) {
      // replace fresh data
      state.symbols = symbols;
    },
    addSymbol(state, symbol) {
      state.symbols = [...state.symbols, symbol];
    },
    removeSymbol(state, symbol) {
      state.symbols = state.symbols.filter(
        (item) => item.symbol !== symbol
      );
    }
  },
  actions: {
    setSymbols({ commit }, symbols) {
      commit("setSymbols", symbols);
    },
    addSymbol({ commit }, symbol) {
      commit("addSymbol", symbol);
    },
    removeSymbol({ commit }, symbol) {
      commit("removeSymbol", symbol);
    },
    async fetchSymbols(context) {
      context.commit("startLoading");
      return await fetch(
        "https://api2.binance.com/api/v3/ticker/24hr?symbols=" +
          JSON.stringify(context.getters.getDataByKey("symbol"))
      )
        .then((response) => response.json())
        .then((data) => {
          context.commit("stopLoading");
          context.commit("setSymbols", data);
        })
        .catch((err) => {
          console.error(err);
          context.commit("stopLoading");
        });
    }
  },
  getters: {
    getBySymbol: (state) => (symbol) => {
      return state.symbols.find((item) => item.symbol === symbol);
    },
    getDataByKey: (state) => (key) => {
      return state.symbols.reduce((acc, obj) => {
        acc.push(obj[key]);
        return acc;
      }, []);
    },
    noSymbol: (state) => {
      return state.symbols.length === 0;
    }
  },
  plugins: [new VuexPersistence({ modules: ["symbols"] }).plugin]
});
