<template>
	<span>
		<h3 v-if="started">
			{{ timeFloor }}
		</h3>
	</span>
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
                    this.started = true
					clearInterval(this.timer)
					// CountDown starts
                    this.Counter(this.started)
                }
            },
			time: {
				handler: function () {
					if (this.time <= this.stopValue) {
						this.started = false;
						this.forceWrong();
					}
				},
			},
		},
		
	};
</script>