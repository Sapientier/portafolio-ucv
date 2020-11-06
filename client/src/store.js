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
        setUserNumNoti: (state, numnoti) => (state.user.numNoti = numnoti),
        getServicios: (state, servicios) => (state.servicios = servicios),
        setServicios: (state, servicios) => state.servicios.unshift(servicios),
        removeServicios: (state, id) =>
            (state.servicios = state.servicios.filter(
                (servicio) => servicio._id != id
            )),
        updateServicios: (state, newserv) => {
            const index = state.servicios.findIndex(
                (servicio) => servicio._id === newserv._id
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
        async getServicios({ commit }) {
            await Services.getservices()
                .then((response) => {
                    commit("getServicios", response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        setServiciosAll({ commit }, values) {
            commit("getServicios", values);
        },
        setServicios({ commit }, values) {
            commit("setServicios", values);
        },
        removeServicios({ commit }, values) {
            commit("removeServicios", values);
        },
        updateServicios({ commit }, values) {
            commit("updateServicios", values);
        },
        async filterServiciosbyCat({ commit }, value) {
            await Services.getuniservicebycat({
                category: value,
            })
                .then((response) => {
                    commit("getServicios", response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async filterServiciosbyApproved({ commit }, value) {
            await Services.getuniservicebyapproved({
                approve: value,
            })
                .then((response) => {
                    commit("getServicios", response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async filterServiciosbyName({ commit }, value) {
            await Services.getuniservicebyname({
                name: value,
            })
                .then((response) => {
                    commit("getServicios", response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
    },
});
