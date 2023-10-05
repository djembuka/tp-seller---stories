<template>
  <div v-if="isOpen" id="storiesModal" class="modal-win">
    <div class="modal-win__close" @click="hide()"></div>
    <div class="modal-win__shadow" @click="hide()"></div>
    <stories-gallery @hide-modal="hide"></stories-gallery>
  </div>
</template>

<script>
import StoriesGallery from './StoriesGallery.vue';

export default {
  name: 'StoriesModal',
  data() {
    return {};
  },
  computed: {
    isOpen() {
      return this.$store.state.modalWin.isOpen;
    },
  },
  methods: {
    hide() {
      this.$store.commit('modalOpenHide', false);
      //set all not active
      this.$store.commit('setStoryActive', undefined);
      this.$store.commit('setSliderTimeoutId', undefined); //clear interval
    },
  },
  components: {
    StoriesGallery,
  },
};
</script>

<style scoped>
.modal-win {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-win__shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
}
.modal-win__close {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  z-index: 20;
}
.modal-win__close:hover {
  opacity: 0.7;
}
.modal-win__close:before {
  content: '';
  position: absolute;
  top: 9px;
  right: -2px;
  border-top: 1px solid #fff;
  width: 24px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  z-index: 25;
}
.modal-win__close:after {
  content: '';
  position: absolute;
  top: 9px;
  right: -2px;
  border-top: 1px solid #fff;
  width: 24px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  z-index: 25;
}
@media (max-width: 575px) {
  .modal-win__close {
    top: 23px;
    right: 23px;
  }
}
</style>
