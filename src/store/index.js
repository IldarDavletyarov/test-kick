import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    finance: {
      kick: 0,
      eth: 0,
    }
  },
  mutations: {
    updateFinance(state, payload) {
      state.finance = payload;
    }
  },
  actions: {
    updateFinance({ commit }, payload) {
      commit('updateFinance', payload);
    },
  },
});
