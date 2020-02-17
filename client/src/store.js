import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        articles: require('@/data/articles.json'),
        servicios: require('@/data/servicios.json'),
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    getters: {
        categories: state => {
        const categories = []

        for (const servicio of state.servicios) {
            if (
            !servicio.category ||
            categories.find(category => category.text === servicio.category)
            ) continue

            const text = servicio.category

            categories.push({
            text,
            to: `/category/${text}`
            })
        }

        return categories.sort().slice(0, 4)
        },
        links: (state, getters) => {
        return state.items.concat(getters.categories)
        }
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        }
    }
})