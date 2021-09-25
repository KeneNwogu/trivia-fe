<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-12 col-lg-6">
				<h2>Login</h2>
				<form method="get" @submit.prevent.self="login">
					<div class="form-group pad">
						<label class="form-label" for="name">Name</label>
						<input class="form-control" type="text" name="name" />
					</div>
					<div class="form-group pad">
						<label class="form-label" for="password">Password</label>
						<input class="form-control" type="password" name="password"/>
					</div>
					<div class="pad">
                        <button class="btn-submit btn-primary rounded" @click.prevent="login">Login</button>
					</div>
				</form>
				<p>Don't have an account? Register <router-link to="/register">here</router-link></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data(){
        return {

		}
	},

    methods: {
        login: function(){
            let username = document.querySelector('input[name="name"]').value;
            let password = document.querySelector('input[name="password"]').value;

            const payload = {
				username,
				password,
			}

            this.$store.dispatch('loginUser', payload);
        }
    }
}
</script>

<style scoped>
.pad {
	margin-bottom: 0.75rem;
}
</style>