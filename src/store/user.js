import Axios from "../helpers/AppAxios";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        userInfo: '',
    },
    actions: {
        getUserInfo({commit}) {
            Axios.header().get('/api/user').then((res) => {

                commit('setUserInfo', res.data);
                commit('setAuth', true);
            }).catch(() => {
                commit('setUserInfo', []);
                localStorage.removeItem('_userToken');
                localStorage.removeItem('vuex');
                localStorage.clear();
                return window.location = '/'
            });
        },
        logout({commit}) {
            localStorage.removeItem('_userToken');
            localStorage.removeItem('vuex');
            localStorage.clear();
            commit('setLogout', false);
            return window.location = '/';
        },
    },
    mutations: {
        setUserInfo(state, userData) {
            state.userInfo = userData;
        },
        setLogout(state, data) {
            state.authenticated = data;
        },
        setAuth(state, bol) {
            state.authenticated = bol
        }
    }
}
