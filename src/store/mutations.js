import router from '../router'
export default {
    GET_QUESTIONS: (state) => {
        let questions = fetch("https://opentdb.com/api.php?amount=10", {
				method: "GET",
				crossDomain: true,
			}).then((response) =>
			response.json().then((data) => (state.questions = data.results))
		);
        // state.questions = questions;
        console.log(questions)
    },

    REGISTER_USER: (state, payload) => {
        fetch("https://kcee-trivia.herokuapp.com/api/users/register/", {
            method: 'POST',
            crossDomain: true,
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json().then((data) => {
            state.messages.register_message = data;
            alert("Successfully registered user");
            console.log(data);

            router.push('/login');
        })).catch(err => alert(err.message));
        
    },

    LOGIN_USER: (state, payload) => {
        console.log(payload)
        fetch("https://kcee-trivia.herokuapp.com/api/users/login/", {
            method: 'POST',
            crossDomain: true,
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json().then((data) => {
            console.log(state.user);
            localStorage.setItem("user_id", data.user_id);
            state.user.email = data.email;
            state.user.user_id = data.user_id;
            state.user.username = data.username;
            state.user.hearts = data.hearts;
            state.user.high_score = data.high_score;
            state.user.token = "Bearer " + data.token;
            alert("Successfully logged in");
            console.log(state.user);

            // redirect
            router.push('/account');
        })).catch(err => alert(err.message));
    },
    UPDATE_USER: (state, payload) => {
        let id = localStorage.getItem("user_id");
        fetch(`https://kcee-trivia.herokuapp.com/api/users/${id}/`, {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Authorization': state.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json().then((data) => {
            console.log(data);
            state.user.user_id = data.user_id;
            state.user.username = data.username;
            state.user.email = data.email;
            state.user.hearts = data.hearts;
            state.user.high_score = data.high_score;
        }))
    },

    LOGOUT_USER: (state) => {
        state.user = {};
        console.log(state.user)
    }
}