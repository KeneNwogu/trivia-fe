export default {
    getQuestions: (context) => {
        context.commit('GET_QUESTIONS');
    },
    registerUser: (context, payload) => {
        context.commit("REGISTER_USER", payload);
    },
    loginUser: (context, payload) => {
        context.commit("LOGIN_USER", payload);
    },
    updateUser: ({commit}, payload) => {
        commit("UPDATE_USER", payload);
    },
    logoutUser: (context) => {
        context.commit("LOGOUT_USER");
    }
}