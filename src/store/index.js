// import Vue from "vue";
import createPersistedState from "vuex-persistedstate"
import {createStore} from "vuex";
import state from './state';
import mutations from './mutations';
import actions from './actions';

// Vue.use(Vuex);

export default createStore({
    state,
    mutations,
    actions,
    plugins: [createPersistedState()]
});