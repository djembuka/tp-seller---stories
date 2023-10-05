<template
  ><div
    class="swiper modal-win__gallery"
    ref="swiper"
    @click="$emit('hideModal')"
  >
    <div class="swiper-wrapper" @click.stop>
      <div
        class="swiper-slide"
        v-for="(story, storyIndex) in $store.state.stories"
        :key="story.id"
      >
        <stories-card
          :story="story"
          :storyIndex="storyIndex"
          :active="story.active"
        ></stories-card>
      </div>
    </div>
  </div>
</template>

<script>
import StoriesCard from './StoriesCard.vue';

export default {
  emits: ['hideModal'],
  components: {
    StoriesCard,
  },
  mounted() {
    if (window.Swiper) {
      let swiper,
        options = {};
      if (window.matchMedia('(max-width: 575px)').matches) {
        //mobile gallery
        options = {
          slidesPerView: 1,
        };
      } else {
        //desktop gallery
        options = {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
        };
      }

      swiper = new window.Swiper(this.$refs.swiper, options);

      this.$store.commit('setSwiper', swiper);
      //swiper events
      let dispatch = this.$store.dispatch;
      swiper.on('transitionStart', function() {
        dispatch('setActive', swiper.activeIndex);
      });
      //slide to the active slide
      swiper.slideTo(this.$store.getters.activeStoryIndex, 0, false);
      //start slider
      this.$store.dispatch('next');
    }
  },
};
</script>

<style scoped>
.modal-win__gallery {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: calc((100vh - 600px) / 2) auto;
  z-index: 11;
}
.swiper-slide {
  width: 370px;
}
@media (max-width: 575px) {
  .modal-win__gallery {
    margin: 0;
    height: 100%;
  }
  .swiper-slide {
    width: 100%;
  }
}
</style>
