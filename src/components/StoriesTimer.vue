<template>
  <div style="position: absolute; top: 0; left: 0; z-index: 10000;">
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
      periods: [],
      periodIndex: 0,
      t: 0,
      timeoutFlag: false,
      itemIndex: 0,
    };
  },
  methods: {
    resetData() {
      this.periods = [];
      this.t = 0;
      this.timeoutFlag = false;
      this.itemIndex = 0;
    },
    async start() {
      let n = true,
        storyIndex = this.$store.getters.activeStoryIndex,
        interval = this.$store.state.slider.speed,
        length = this.$store.state.stories[storyIndex].card.items.length;

      this.periodIndex = 0;
      this.resetData();

      this.$store.commit('setStoryActive', storyIndex);

      //set index -1
      this.$store.commit('setItemActive', {
        storyIndex: storyIndex,
        itemIndex: -1,
      });

      await new Promise((r) => setTimeout(r, 100));

      //set index
      this.$store.commit('setItemActive', {
        storyIndex: storyIndex,
        itemIndex: this.itemIndex,
      });

      do {
        this.timeoutFlag = true;
        if (this.periodIndex >= 0 && this.periodIndex < length) {
          this.periods[this.periodIndex] = this.t;
          if (this.t < interval) {
            await new Promise((r) => setTimeout(r, 100));
            if (this.timeoutFlag) {
              //period
              this.t += 100;
              this.periods[this.periodIndex] = this.t;
            }
          } else {
            this.periodIndex++;
            this.t = 0;

            //next story
            if (
              this.itemIndex > length - 2 &&
              this.$store.state.stories[storyIndex + 1]
            ) {
              //set next story active
              this.$store.commit('setStoryActive', ++storyIndex);
              this.start();
              break;
            }

            //set index
            this.$store.commit('setItemActive', {
              storyIndex: storyIndex,
              itemIndex: ++this.itemIndex,
            });
          }
        } else {
          break;
        }
      } while (n);
    },
    prev() {
      this.periodIndex--;
      this.resetData();
    },
    next() {
      this.periodIndex++;
      this.resetData();
    },
  },
};
</script>
