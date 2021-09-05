<template>
	<div class="timer">
		<h3 v-if="started">
			{{ timeFloor }}
		</h3>
	</div>
</template>


<script>
	export default {
		props: {
			time: Number,
			wrong: Boolean,
			Counter: Function,
			forceWrong: Function,
			question: Object,
			timer: Object
		},

		data() {
			return {
				started: false,
				stop: false,
				stopValue: 0.5,
			};
		},

		computed: {
			timeFloor() {
				return Math.floor(this.time);
			},
		},

		watch: {
			question: {
				immediate: true,
				handler: function(){
					this.started = true;
					clearInterval(this.timer);
					// CountDown starts
					this.Counter(this.started);
				},
			},
			time: {
				handler: function () {
					let timer_dom = document.querySelector('.timer');
					timer_dom.style.width = (this.time * 10) + '%';
					if (this.time <= this.stopValue) {
						// this.started = false;
						this.forceWrong();
					}
				},
			},
		},
	};
</script>

<style>
:root {
	--bg-color: #34495e;
	--default-size: 1em;
	--label-font-size: --default-size / 4;
	--label-font-size-redo: --default-size * 4;
}
div.timer {
	margin: auto;
	border-bottom: 0.4em solid lightblue;
	transition: .1s ease-out;
}

</style>