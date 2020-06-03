// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        grammar: "s -> n v\nn -> 'gael'\nv -> 'play' | 'plays'",
        backend_domain: "localhost",
        backend_port: "5000",
        paraphrases: ["I like to play tennis when the weather is good.", "paraphrase 2"],
        paraphrases_status: "",
        paraphrase_input: [],
        waitingParaphrase: false,
    },
    getters: {
        server_address : state => {
            return "http://" + state.backend_domain + ":" + state.backend_port;
        }
    },
    mutations: {
        updateGrammar(state, new_grammar) {
            state.grammar = new_grammar
        },
        updateBackendDomain(state, new_domain) {
            state.backend_domain = new_domain
        },
        updateBackendPort(state, new_port) {
            state.backend_port = new_port
        },
        updateParaphrases(state, new_paraphrases) {
            state.paraphrases = new_paraphrases
        },
        updateParaphrasesStatus(state, new_status) {
            state.paraphrases_status = new_status
        },
        updateWaitingParaphrase(state, new_value){
            state.waitingParaphrase = new_value
        },
        addParaphraseInput(state, new_input){
            state.paraphrase_input.push(new_input)
        },
        removeParaphraseInput(state, index){
            state.paraphrase_input.splice(index, 1)
        }
    },
    actions: {}
});