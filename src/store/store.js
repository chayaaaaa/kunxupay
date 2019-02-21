import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        access_token: ''
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.token = token
        },
        access_token(state, access_token) {
            state.access_token = access_token
            localStorage.access_token = access_token
        },
        del_token(state) {
            state.token = ''
            window.localStorage.removeItem('token')
        }
    }
})