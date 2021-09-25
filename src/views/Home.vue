<template>
	<div class="home container text-center">
		<div class="jumbotron">
			<h1>Trivia Quiz App</h1>
			<div class="row">
				<h3>How to play:</h3>
				<ul class="d-flex justify-content-center pad">
					<li><router-link to="/register">Register</router-link></li>
					<li><router-link to="/login">Login</router-link></li>
					<li><router-link to="/quiz">Play!</router-link></li>
				</ul>

				<div>
					<p style="font-weight: 600">Although you can <router-link to="/quiz">play</router-link> without logging in, you won't be able to see yourself on the leaderboard</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
    .pad{
		list-style: none;
		flex-direction: column;
	}
</style>
<script>
	require("../static/css/bootstrap.min.css");
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: "Home",
		components: {
			// HelloWorld
		},
	};
</script>
