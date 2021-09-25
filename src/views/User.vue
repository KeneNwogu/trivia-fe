<template>
    <div v-if="!(user && Object.keys(user).length == 0)" style="text-align: center">
        <h1>Hi, {{ user.username }}</h1>
        <h2>You're current ranked No.{{ user.rank }} in the world!</h2>
    </div>
    <div style="text-align: center" v-else>
        <h1>You're not logged in.</h1>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted: function () {
        console.log(this.$store.state.user)
        let id = localStorage.getItem('user_id');
        fetch(`https://kcee-trivia.herokuapp.com/api/users/${id}/`, {
            method: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': this.$store.state.user.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json().then((data) => {
            this.$store.state.user.user_id = data.user_id;
            this.$store.state.user.rank = data.rank;
            this.$store.state.user.high_score = data.high_score;
            this.$store.state.user.hearts = data.hearts;
            this.$store.state.user.account_number = data.account_number;
            console.log(this.$store.state)
        }))
    },

    computed: {
        user(){
            return this.$store.state.user;
        }
    }
}
</script>