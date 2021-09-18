export default {
    getQuestions: (context) => {
        context.commit('GET_QUESTIONS');
    },
    registerUser: (context, payload) => {
        context.commit("REGISTER_USER", payload);
    },
    loginUser: (context, payload) => {
        context.commit("LOGIN_USER", payload);
    }
}