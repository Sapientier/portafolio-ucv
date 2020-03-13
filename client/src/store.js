import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Services from "@/services/Services";
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        servicios: [],
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    getters: {
        services: state => state.servicios,
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
        setToken: (state, token) => {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser: (state, user) => state.user = user,
        getServicios: (state, servicios) => state.servicios = servicios,
        setServicios: (state, servicios) => state.servicios.unshift(servicios),
        removeServicios: (state, id) => (state.servicios = state.servicios.filter(servicio => servicio._id !== id)),
        updateServicios: (state, newserv) => {
            const index = state.servicios.findIndex(servicio => servicio._id === newserv._id);
            if (index !== -1) {
                state.servicios.splice(index, 1, newserv);
            }
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        async getServicios({ commit }) {
            await Services.getservices()
                .then(response => {
                    commit('getServicios', response.data)
                })
                .catch(error => console.log(error));
        },
        async setServicios({ commit }, fd) {
            await Services.insertservices(fd)
                .then(response => {
                    commit('setServicios', response.data)
                })
                .catch(error => console.log(error));
        },
        async removeServicios({ commit }, fd) {
            await Services.deleteservices(fd)
                .then(response => {
                    commit('removeServicios', fd._id)
                })
                .catch(error => console.log(error));
        },
        async updateServicios({ commit }, fd) {
            await Services.updateservices(fd)
                .then(response => {
                    commit('updateServicios', response.data)
                })
                .catch(error => console.log(error));
        },
        async filterServicios({ commit }, value) {
            await Services.getuniservice({
                category: value
            })
                .then(response => {
                    commit('getServicios', response.data)
                })
                .catch(error => console.log(error));
        }
    }
})