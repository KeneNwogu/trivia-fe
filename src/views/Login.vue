<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6">
				<h2>Register</h2>
				<form method="get" @submit.prevent.self="register">
					<div class="form-group">
						<label class="form-label" for="name">Name</label>
						<input class="form-control" type="text" name="name" />
					</div>
					<div class="form-group">
						<label class="form-label" for="password">Password</label>
						<input class="form-control" type="password" name="password"/>
					</div>
					<button class="btn-submit btn-primary rounded" @click.prevent="login">Login</button>
				</form>
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

            this.$store.dispatch('registerUser', payload);
        }
    }
}
</script>

<style scoped>

</style>