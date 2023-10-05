<template>
  <div
    :class="[
      'b-stories__card__item',
      {
        'b-stories__card__item--active':
          item.active || (activeItemIndex < 0 && itemIndex === 0),
      },
    ]"
    ref="item"
  >
    <video
      muted
      v-if="item.type === 'video'"
      :data-id="`video${itemIndex}`"
      :src="`${item.src}`"
    ></video>

    <div v-else :style="`background-image: url(${item.src});`"></div>
  </div>
</template>

<script>
export default {
  name: 'StoriesCardItem',
  props: {
    item: Object,
    itemIndex: Number,
    activeItemIndex: Number,
    story: Object,
    storyIndex: Number,
  },
  computed: {
    isActive() {
      return this.activeItemIndex === this.itemIndex && this.story.active;
    },
    neighborIsActive() {
      let prevNeighbor = this.story.card.items[this.itemIndex - 1];
      let prevStory = this.$store.state.stories[this.storyIndex - 1];

      if (!prevNeighbor) {
        prevNeighbor = prevStory
          ? prevStory.card.items[prevStory.card.items.length - 1]
          : undefined;
      }

      let nextNeighbor = this.story.card.items[this.itemIndex + 1];
      let nextStory = this.$store.state.stories[this.storyIndex + 1];

      if (!nextNeighbor) {
        nextNeighbor = nextStory ? nextStory.card.items[0] : undefined;
      }

      /*return (
        !this.item.loaded &&
        ((prevNeighbor && prevNeighbor.active) ||
          (nextNeighbor && nextNeighbor.active))
      );*/

      return prevNeighbor ? prevNeighbor.active : 'undefined';
    },
  },
  watch: {
    isActive(val) {
      if (this.item.type === 'video') {
        let video = this.$refs.item.querySelector(`video`);
        if (val === true) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
        }
      }
    },
  },
  methods: {
    centerVideo() {
      setTimeout(() => {
        this.$refs.item.querySelectorAll('video').forEach((v) => {
          let vWidth = v.offsetWidth;
          let vHeight = v.offsetHeight;
          let cWidth = this.$refs.item.closest('.b-stories__card').offsetWidth;
          let cHeight = this.$refs.item.closest('.b-stories__card')
            .offsetHeight;

          if (vWidth > cWidth) {
            v.style.marginLeft = (-1 * (vWidth - cWidth)) / 2 + 'px';
          } else if (vHeight > cHeight) {
            v.style.marginTop = (-1 * (vHeight - cHeight)) / 2 + 'px';
          }
        });
      }, 100);
    },
  },
  mounted() {
    this.centerVideo();
  },
};
</script>
