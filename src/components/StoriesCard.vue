<template>
  <div
    ref="card"
    :class="[
      'b-stories__card',
      {
        'b-stories__card--active': active,
      },
    ]"
  >
    <div class="b-stories__card__panel">
      <div
        v-for="(item, itemIndex) in story.card.items"
        :key="item.src"
        :class="{
          'b-stories__card__panel--watched': itemIndex <= activeItemIndex,
          'b-stories__card__panel--active':
            itemIndex === activeItemIndex && story.active,
        }"
      ></div>
    </div>
    <stories-card-item
      v-for="(item, itemIndex) in story.card.items"
      :key="item.src"
      :item="item"
      :itemIndex="itemIndex"
      :activeItemIndex="activeItemIndex"
      :story="story"
      :storyIndex="storyIndex"
    ></stories-card-item>
    <div class="b-stories__card__nav">
      <div class="b-stories__card__next" @click.prevent="next"></div>
      <div class="b-stories__card__prev" @click.prevent="prev"></div>
      <div class="b-stories__card__area" @click.prevent="setActive"></div>
    </div>
    <div class="b-stories__card__info">
      <div
        class="b-stories__card__avatar"
        :style="`background-image: url(${story.card.info.avatar});`"
      ></div>
      <div
        class="b-stories__card__text"
        ref="text"
        v-html="story.card.info.text"
      ></div>
    </div>
    <div class="b-stories__card__button">
      <a :href="story.card.info.url" target="_blank">Подробнее</a>
    </div>
  </div>
</template>

<script>
import StoriesCardItem from './StoriesCardItem.vue';

export default {
  name: 'StoriesCard',
  data() {
    return {};
  },
  props: {
    story: Object,
    storyIndex: Number,
    active: Boolean,
  },
  watch: {
    active(val) {
      if (!val) return;
      //start slider from the very beginning
      this.$store.commit('setItemActive', {
        storyIndex: this.storyIndex,
        itemIndex: 0,
      });

      //slide to the active card
      this.$store.state.swiper.instance.slideTo(
        this.storyIndex,
        this.$store.state.swiper.speed,
        true
      );
    },
  },
  computed: {
    activeItemIndex() {
      return this.story.card.items.findIndex((i) => i.active); //-1
    },
  },
  methods: {
    next() {
      this.$store.dispatch('next');
    },
    prev() {
      this.$store.dispatch('prev');
    },
    setActive() {
      this.$store.dispatch('setActive', this.storyIndex);
    },
  },
  components: { StoriesCardItem },
  mounted() {
    // text ellipsis
    if (window.BX && window.BX.UI && window.BX.UI.TextCrop) {
      let text = new window.BX.UI.TextCrop({
        rows: 3,
        target: this.$refs.text,
      });

      text.init();
    }
  },
  beforeCreate() {
    //styles of the panel transition duration
    if (!document.getElementById('storiesCardStylesheet')) {
      let element = document.createElement('style'),
        sheet;
      element.id = 'storiesCardStylesheet';
      document.head.appendChild(element);
      sheet = element.sheet;

      let style = `.b-stories__card__panel div.b-stories__card__panel--active:before {-webkit-transition-duration: ${this.$store.state.slider.speed}ms;transition-duration: ${this.$store.state.slider.speed}ms;}`;
      sheet.insertRule(style, 0);
    }
  },
};
</script>

<style>
.b-stories__card {
  width: 370px;
  height: 600px;
  position: relative;
  margin-right: 30px;
  flex-shrink: 0;
}
.b-stories__card__panel {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 1px);
  display: flex;
  justify-content: space-between;
  z-index: 20;
}
.b-stories__card__panel div {
  height: 3px;
  background-color: #fff;
  width: 100%;
  margin-right: 1px;
}
.b-stories__card__panel div:before {
  content: '';
  display: block;
  width: 0;
  height: 3px;
  /*background-color: blueviolet;*/
}
.b-stories__card__panel div.b-stories__card__panel--active:before {
  -webkit-transition: width 1s linear;
  transition: width 1s linear;
  width: 100%;
  background-color: coral;
}
.b-stories__card__panel div.b-stories__card__panel--watched:before {
  width: 100%;
  background-color: aquamarine;
}
.b-stories__card__panel
  div.b-stories__card__panel--active.b-stories__card__panel--watched:before {
  background-color: gold;
}
.b-stories__card__nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: 15;
}
.b-stories__card__prev {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  /*background-color: bisque;*/
  z-index: 1;
}
.b-stories__card__next {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  /*background-color: aliceblue;*/
  z-index: 1;
}
.b-stories__card__area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: cornflowerblue;*/
  z-index: 2;
}
.b-stories__card:not(.b-stories__card--active) .b-stories__card__prev,
.b-stories__card:not(.b-stories__card--active) .b-stories__card__next {
  pointer-events: none;
  z-index: -1;
}
.b-stories__card--active .b-stories__card__area {
  pointer-events: none;
  z-index: -1;
}
.b-stories__card__info {
  position: absolute;
  top: 20px;
  left: 15px;
  width: 100%;
  display: flex;
  z-index: 20;
}
.b-stories__card__avatar {
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 20px;
  border-radius: 50%;
}
.b-stories__card__text {
  color: #fff;
  font-size: 14px;
  width: calc(100% - (15px + 32px + 20px + 15px));
  margin-top: 5px;
  font-family: 'Open Sans', Arial;
  font-weight: 300;
}
.b-stories__card__item {
  width: 370px;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  -webkit-transition: opacity 0.5s ease-in;
  transition: opacity 0.5s ease-in;
  overflow: hidden;
  z-index: 1;
}
.b-stories__card__item video {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.b-stories__card__item div {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.b-stories__card__item--active {
  opacity: 1;
  z-index: 10;
}
.b-stories__card__button {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 20;
}
.b-stories__card__button a {
  display: inline-block;
  background-color: #ffffff99;
  width: 200px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  color: #000;
}
.b-stories__card__button a:hover {
  opacity: 0.7;
}
@media (max-width: 575px) {
  .b-stories__card,
  .b-stories__card__item {
    width: 100%;
    height: 100%;
  }
  .b-stories__card__nav {
    display: none;
  }
  .b-stories__card__text {
    width: calc(100% - (15px + 32px + 20px + 10px + 20px + 23px));
  }
}
</style>
