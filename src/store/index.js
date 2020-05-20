// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        grammar: "s -> n v\nn -> 'gael'\nv -> 'play' | 'plays'",
        backend_domain: "localhost",
        backend_port: "5000",
        paraphrases: [""],
    },
    getters: {
        server_address : state => {
            return "http://" + state.backend_domain + ":" + state.backend_port + "/";
        }
    },
    mutations: {
        updateGrammar(state, new_grammar) {
            state.grammar = new_grammar
        },
        updateBackenDomain(state, new_domain) {
            state.backend_domain = new_domain
        },
        updateBackendPort(state, new_port) {
            state.backend_port = new_port
        },
        updateParaphrases(state, new_paraphrases) {
            state.paraphrases = new_paraphrases
        },
    },
    actions: {}
});