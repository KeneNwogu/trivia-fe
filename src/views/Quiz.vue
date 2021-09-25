<template>
	<NavBar :score="score" />
	<div class="container" v-if="!(user && Object.keys(user).length != 0) || user.hearts > 0">
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
	</div>

	<div style="margin: 0; min-height: 50vh" class="d-flex" v-if="user && Object.keys(user).length != 0 && !(user.hearts > 0)">
        <h3 style="color: red; margin: auto">You have run out of hearts</h3>
	</div>
</template>

<script>
	require("../static/css/bootstrap.min.css");
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
				// questions: [],
				currentQuestionIndex: 0,
				score: 0,
				highScore: 0,
				wrong: null,
				selected_answer_index: null,
			};
		},

		mounted: function () {
			this.$store.dispatch("getQuestions");
			this.questions = this.$store.state.questions;
		},

		watch: {
			currentQuestionIndex: {
				handler: function () {
					if (this.currentQuestionIndex == 8) {
						this.fetchMoreQuestions();
						this.currentQuestionIndex = 0;
					}
				},
			},
		},

		computed: {
			questions() {
				return this.$store.state.questions;
			},
			user(){
				return this.$store.state.user;
			}
		},

		methods: {
			selectAnswer: function (index) {
				this.selected_answer_index = index;
			},

			fetchMoreQuestions: function () {
				this.wrong = null;
				this.selected_answer_index = null;
				this.$store.dispatch("getQuestions");
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

				// update user's high score
				if (this.$store.state.user.hearts > 0) {
					if (this.score > this.$store.state.user.high_score) {
						const payload = {
							high_score: this.score,
							hearts: this.$store.state.user.hearts - 1,
						};
						this.$store.dispatch("updateUser", payload);
					} else {
						const payload = {
							hearts: this.$store.state.user.hearts - 1,
						};
						this.$store.dispatch("updateUser", payload);
					}
				}
				else if(this.$store.state.user && this.$store.state.user.hearts <= 0){
					alert("You have run out of hearts!!!");
				}

				this.score = 0;

				this.$store.dispatch("getQuestions");
				this.questions = this.$store.state.questions;
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
