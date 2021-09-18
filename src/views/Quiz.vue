<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
	<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<NavBar :score="score" />
	<QuestionBox
		v-if="questions.length"
		:question="questions[currentQuestionIndex]"
		:score="score"
		:next="next"
		:selectAnswer="selectAnswer"
		:addScore="addScore"
		:tryAgain="tryAgain"
		:isWrong="isWrong"
		:wrong="wrong"
		:selected_answer_index="selected_answer_index"
		:resetSelectAnswer="resetSelectAnswer"
		:forceWrong="forceWrong"
	/>
</template>

<script>
	// import { mapActions } from 'vuex';
	//
	import QuestionBox from "../components/QuestionBox.vue";
	import NavBar from "../components/NavBar.vue";

	export default {
		name: "App",
		components: {
			NavBar,
			QuestionBox,
			
		},
		data() {
			return {
				questions: [], // array of question objects  Question: {name:str, answers:[]}
				currentQuestionIndex: 0,
				score: 0,
				highScore: 0,
				wrong: null,
				selected_answer_index: null,
			};
		},

		mounted: function(){
			this.$store.dispatch('getQuestions')
			this.questions = this.$store.state.questions;
		},

		watch: {
			currentQuestionIndex: {
				handler: function () {
					if (this.currentQuestionIndex == 10) {
						this.fetchMoreQuestions();
					}
				},
			},
		},

		methods: {
			selectAnswer: function (index) {
				this.selected_answer_index = index;
			},

			fetchMoreQuestions: function () {
				this.wrong = null;
				this.selected_answer_index = null;
				fetch("http://127.0.0.1:5000/api/questions/?amount=10", {
					method: "GET",
					crossDomain: true,
				}).then((response) =>
					response.json().then((data) => {
						this.questions = data;
						this.currentQuestionIndex = 0;
					})
				);
			},

			resetSelectAnswer: function () {
				this.selected_answer_index = null;
			},

			next: function () {
				this.selected_answer_index = null;
				this.currentQuestionIndex++;
			},

			addScore: function () {
				this.score++;
			},

			tryAgain: function () {
				this.wrong = null;
				this.selected_answer_index = null;
				this.score = 0;

				fetch("http://127.0.0.1:5000/api/questions/?amount=10", {
					method: "GET",
					crossDomain: true,
				}).then((response) =>
					response.json().then((data) => {
						this.questions = data;
						this.currentQuestionIndex = 0;
					})
				);
			},

			isWrong: function (index) {
				if (
					this.selected_answer_index === index &&
					index !== this.correct_answer_index &&
					this.selected_answer_index !== null
				) {
					this.wrong = true;
					return true;
				}
			},

			forceWrong: function () {
				this.wrong = true;
			},
		},
	};
</script>

<style scoped>

#app {
	font-family: Avenir, Helvetica, Arial;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

body {
	margin: 0;
	background-image: url("../assets/background.jpg");
	background-position-x: right;
	background-position-y: -60vh;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
