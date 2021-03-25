import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Services from "@/services/Services";
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        servicios: [],
        token: null,
        user: null,
        isUserLoggedIn: false,
        notificaciones: [],
        numNoti: 0,
    },
    getters: {
        services: (state) => state.servicios,
        notifications: (state) => state.notificaciones,
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
            if (token) {
                state.isUserLoggedIn = true;
            } else {
                state.isUserLoggedIn = false;
            }
        },
        setUser: (state, user) => (state.user = user),
        setNoti: (state, notificaciones) => (state.notificaciones = notificaciones),
        cleanNoti: (state) => (state.notificaciones = []),
        setUserNumNoti: (state, numnoti) => (state.numNoti = numnoti),
        getServicios: (state, servicios) => (state.servicios = servicios),
        setServicios: (state, servicios) => state.servicios.unshift(servicios),
        removeServicios: (state, id) => {
            const index = state.servicios.findIndex(
                servicio => servicio._id === id
            );
            if (index !== -1) {
                state.servicios.splice(index, 1)
            }
        },
        updateServicios: (state, newserv) => {
            const index = state.servicios.findIndex(
                servicio => servicio._id === newserv._id
            );
            if (index !== -1) {
                state.servicios.splice(index, 1, newserv);
            }
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token);
        },
        setUser({ commit }, user) {
            commit("setUser", user);
        },
        setNoti({ commit }, notificaciones) {
            commit("setNoti", notificaciones);
        },
        cleanNoti({ commit }) {
            commit("cleanNoti");
        },
        setUserNumNoti({ commit }, numnoti) {
            commit("setUserNumNoti", numnoti);
        },
        setServiciosAll({ commit }, values) {
            commit("getServicios", values);
        },
        setServicios({ commit }, values) {
            setTimeout(() => {
                commit("setServicios", values);
            }, 1000)
        },
        removeServicios({ commit }, values) {
            setTimeout(() => {
                commit("removeServicios", values);
            }, 1000)
        },
        updateServicios({ commit }, values) {
            setTimeout(() => {
                commit("updateServicios", values);
            }, 1000)
        },
        async getServicios({ commit }) {
            await Services.getservices()
                .then((response) => {
                    commit("getServicios", response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
    },
});
