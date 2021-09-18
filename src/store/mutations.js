export default {
    GET_QUESTIONS: (state) => {
        let questions = fetch("http://127.0.0.1:5000/api/questions/?amount=10", {
				method: "GET",
				crossDomain: true,
			}).then((response) =>
			response.json().then((data) => (state.questions = data))
		);
        // state.questions = questions;
        console.log(questions)
    },

    REGISTER_USER: (state, payload) => {
        fetch("http://127.0.0.1:5000/api/users/register/", {
            method: 'POST',
            crossDomain: true,
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json().then((data) => {
            state.messages.register_message = data;
            console.log(data);
        }))
        
    },

    LOGIN_USER: (state, payload) => {
        // pass
    }
}