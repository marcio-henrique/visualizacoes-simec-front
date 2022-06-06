import Vue from 'vue';
import Vuex from 'vuex';

import Simec from './simec';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Simec
  },
});

export default store;
