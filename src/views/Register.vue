<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h2>Register</h2>
				<form method="get" @submit.prevent.self="register">
					<div class="form-group pad">
						<label class="form-label" for="name">Name</label>
						<input class="form-control" type="text" name="name" />
					</div>
					<div class="form-group pad">
						<label class="form-label" for="email">Email</label>
						<input class="form-control" type="email" name="email" />
					</div>
					<div class="form-group pad">
						<label class="form-label" for="password"
							>Password</label
						>
						<input
							class="form-control"
							type="password"
							name="password"
						/>
					</div>
					<div class="form-group pad">
						<label class="form-label" for="confirm-password"
							>Confirm Password</label
						>
						<input
							class="form-control"
							type="password"
							name="confirm-password"
						/>
					</div>
                    <div class="pad">
                       <button class="btn-submit btn-primary rounded" value="Register" @click.prevent="register">Register</button>
					</div>
					<p>Already have an account? Login <router-link to="/login">here</router-link></p>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
    require('../static/css/bootstrap.min.css');
	export default {
		data(){
            return {

			}
		},
        methods:{
            register: function () {
				let username = document.querySelector('input[name="name"]').value;
				let email = document.querySelector('input[name="email"]').value;
				let password = document.querySelector('input[name="password"]').value;
				let confirm_password = document.querySelector('input[name="confirm-password"]').value;

				const payload = {
					username,
					email,
					password,
					confirm_password
				}

				this.$store.dispatch('registerUser', payload);
			}
		}
	};
</script>

<style scoped>
/* @import "../static/css/bootstrap.min.css"; */

.pad {
	margin-bottom: 0.75rem;
}
</style>