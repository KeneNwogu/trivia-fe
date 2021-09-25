<template>
    <div class="text-center">
		<p>Current score: {{ score }}</p>
	</div>
	<div class="container">
		<div class="row justify-content-center" style="margin-top: 20px">
			<div class="question col-lg-6">
				<StopTimer
					v-if="timer"
					:wrong="true"
					:time="time"
					:counter="Counter"
					:force-wrong="forceWrong"
					:question="question"
					:timer="timer"
				/>
				<h3 v-html="question.question" />
				<ul>
					<button
						v-for="(answer, index) in answers"
						:key="index"
						:class="[
							isCorrect(index) ? 'correct' : '',
							isWrong(index) ? 'wrong' : '',
						]"
						:disabled="wrong"
						@click="selectAnswer(index)"
					>
						<li class="answer" v-html="answer" />
					</button>

					<button v-if="wrong" @click="tryAgain()">Try again?</button>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
    require('../static/css/bootstrap.min.css');
	import StopTimer from "../components/StopTimer.vue";
	export default {
		name: "QuestionBox",
		components: {
			StopTimer,
		},
		props: {
			question: Object,
			next: Function,
			addScore: Function,
			selectAnswer: Function,
			score: Number,
			tryAgain: Function,
			isWrong: Function,
			wrong: Boolean,
			selected_answer_index: Number,
			resetSelectAnswer: Function,
			forceWrong: Function,
		},
		data() {
			return {
				correct_answer_index: null,
				correct_answer: null,
				time: 5,
				timer: undefined,
			};
		},

		computed: {
			answers() {
				let answers = [];
				answers.push(...this.question.incorrect_answers);
				let correct_answer_index =
					Math.random(answers.length) * answers.length;
				let correct_answer = this.question.correct_answer;
				answers.splice(correct_answer_index, 0, correct_answer);

				return answers;
			},
		},

		watch: {
			correct_answer_index: {
				immediate: true,
				handler: function () {
					this.correct_answer = this.question.correct_answer;
					this.correct_answer_index = this.answers.indexOf(
						this.correct_answer
					);
				},
			},

			question: {
				handler: function () {
					// clearInterval(timer);
					this.resetTimer();

					let answers = [];
					answers.push(...this.question.incorrect_answers);
					let correct_answer_index =
						Math.random(answers.length) * answers.length;
					let correct_answer = this.question.correct_answer;
					answers.splice(correct_answer_index, 0, correct_answer);
					this.correct_answer_index = this.answers.indexOf(
						this.correct_answer
					);

					return answers;
				},
			},

			selected_answer_index: {
				handler: function () {
					if (this.selected_answer_index == this.correct_answer_index) {
						this.Counter(false);
						this.resetSelectAnswer();
						this.addScore();
						this.next();
					}
				},
			},

			wrong: {
				handler: function () {
					if (this.wrong) {
						let answers = document.querySelectorAll("button");
						answers[this.correct_answer_index].classList.add("correct");
					}
					if (this.wrong == null) {
						let answers = document.querySelectorAll("button");
						answers[this.correct_answer_index].classList.remove(
							"correct"
						);
					}
				},
			},
		},

		methods: {
			// CountDown Function
			Counter: function (started) {
				if (started) {
					this.timer = setInterval(() => {
						if (this.time <= 1 || this.wrong) {
							clearInterval(this.timer);
						}
						this.time -= 0.5;
					}, 500);
				}
			},
			isCorrect: function (index) {
				if (
					index === this.correct_answer_index &&
					this.selected_answer_index === index
				) {
					return true;
				}
			},
			resetTimer: function () {
				this.time = 5;
			},
		},
	};
</script>
<style scoped>

.question-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	margin: 0;
	color: rgba(97, 97, 220, 0.809);
}

.question-box > div {
	text-align: center;
	background-color: white;
	width: 40vw;
	height: fit-content;
	margin: auto;
	display: flex;
	border-radius: 23px;
	padding: 40px;
}

.question-box > div > div {
	margin: auto;
}

ul {
	/* text-align: center; */
	list-style: none;
}

ul > button {
	position: relative;
	right: 27px;
	display: block;
	width: 100%;
	padding: 12px;
	border: 1px solid gray;
	margin-bottom: 12px;
	border-radius: 23px;
	background-color: inherit;
	cursor: pointer;
}

.correct {
	background-color: lightblue;
}

.wrong {
	background-color: #bb6868;
}
button{
	outline: none;
}
</style>