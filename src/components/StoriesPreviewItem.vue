<template>
  <div
    class="b-stories__preview__item"
    :class="{ watched: story.watched, loaded: loaded }"
    :data-id="story.id"
    @click="click()"
  >
    <div :class="['b-stories__preview__img', { 'load-circle': !loaded }]">
      <div :style="'background-image: url(' + story.preview.img + ');'"></div>
    </div>
    <div class="b-stories__preview__text" ref="text">
      {{ story.preview.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoriesPreviewItem',
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    story: Object,
    storyIndex: Number,
  },
  methods: {
    click() {
      //set active
      this.$store.commit('setStoryActive', this.storyIndex);
      this.$store.commit('setItemActive', {
        storyIndex: this.storyIndex,
        itemIndex: 0,
      });
      //open gallery
      this.$store.commit('modalOpenHide', true);
    },
  },
  mounted() {
    //text ellipsis
    if (window.BX && window.BX.UI && window.BX.UI.TextCrop) {
      let rows = window.matchMedia('(max-width: 767px)').matches ? 4 : 3;

      let text = new window.BX.UI.TextCrop({
        rows: rows,
        target: this.$refs.text,
      });

      text.init();
    }
    //load images
    var img = document.createElement('img');

    img.setAttribute('src', this.story.preview.img);
    img.addEventListener('load', () => {
      this.loaded = true;
    });
  },
};
</script>

<style scoped>
.b-stories__preview__item {
  width: calc((100% - 30px * 5) / 6);
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.b-stories__preview__item:hover,
.b-stories__preview__item.watched {
  opacity: 0.7;
}
.b-stories__preview__img {
  margin: 0 auto 22px;
  max-width: 128px;
  border-radius: 50%;
}
.b-stories__preview__img div {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 100%;
  border-radius: 50%;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease-in;
  transition: opacity 0.3s ease-in;
}
.b-stories__preview__item.loaded .b-stories__preview__img div {
  opacity: 1;
}
.b-stories__preview__text {
  text-align: center;
  font-size: 0.88rem;
  line-height: 1.2;
  max-height: 45px;
  overflow: hidden;
}
.load-circle {
  position: relative;
}
.load-circle:after {
  content: '';
  position: absolute;
  height: 30px;
  width: 30px;
  top: calc(50% - 15px);
  right: calc(50% - 15px);
  animation: circle 1.3s infinite linear;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  border-right-color: transparent;
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes circle {
  0% {
    -webkit-transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@media (max-width: 767px) {
  .b-stories__preview__item {
    width: calc((100vw - 15px * 2 - 10px * 2) / 3);
  }
}
</style>
