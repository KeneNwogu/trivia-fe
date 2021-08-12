<template>
	<div class="question-box">
		<div>
			<StopTimer
				:wrong="true"
				:time="time"
				:Counter="Counter"
				:forceWrong="forceWrong"
				:question="question"
				:timer="timer"
			/>

			<div class="question">
				<h3 v-html="question.question"></h3>
				<ul>
					<button
						v-for="(answer, index) in answers"
						:key="index"
						@click="this.selectAnswer(index)"
						:class="[
							isCorrect(index) ? 'correct' : '',
							this.isWrong(index) ? 'wrong' : '',
						]"
						:disabled="this.wrong"
					>
						<li v-html="answer" class="answer"></li>
					</button>

					<button v-if="this.wrong" @click="this.tryAgain()">
						Try again?
					</button>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import StopTimer from "./StopTimer.vue";
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
				timer: undefined
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
<style>
.question-box {
	display: flex;
	min-height: 100vh;
	margin: 0;
	color: rgba(97, 97, 220, 0.809);
}

.question-box > div {
	text-align: center;
	background-color: white;
	width: 40vw;
	height: 60vh;
	margin: auto;
	display: flex;
	border-radius: 23px;
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
</style>