<template>
  <div>
    <div>
      <span class="btn" @click.prevent="start">Start</span>
      <span class="btn" @click.prevent="prev">Prev</span>
      <span class="btn" @click.prevent="next">Next</span>
    </div>
    <div
      v-for="(period, index) in periods"
      :key="index * Math.floor(Math.random() * 100000)"
    >
      {{ index + 1 }}. {{ period }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: 3000,
      periods: [],
      periodIndex: 0,
      t: 0,
      timeoutFlag: false,
    };
  },
  methods: {
    async start() {
      let n = true;

      do {
        this.timeoutFlag = true;
        if (this.periodIndex >= 0 && this.periodIndex < 4) {
          this.periods[this.periodIndex] = this.t;
          if (this.t < this.interval) {
            await new Promise((r) => setTimeout(r, 100));
            if (this.timeoutFlag) {
              this.t += 100;
              this.periods[this.periodIndex] = this.t;
            }
          } else {
            this.periodIndex++;
            this.t = 100;
          }
        } else {
          break;
        }
      } while (n);
    },
    prev() {
      this.periodIndex--;
      this.t = 0;
      this.timeoutFlag = false;
    },
    next() {
      this.periodIndex++;
      this.t = 0;
      this.timeoutFlag = false;
    },
  },
};
</script>
