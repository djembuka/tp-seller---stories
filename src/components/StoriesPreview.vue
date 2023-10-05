<template>
  <div class="b-stories__preview">
    <div class="b-stories__preview__wrapper">
      <stories-preview-item
        v-for="(story, storyIndex) in $store.state.stories"
        :key="story.id"
        :story="story"
        :storyIndex="storyIndex"
      ></stories-preview-item>
    </div>
  </div>
</template>

<script>
import StoriesPreviewItem from './../components/StoriesPreviewItem.vue';

export default {
  name: 'StoriesPreview',
  components: {
    StoriesPreviewItem,
  },
};
</script>

<style scoped>
.b-stories__preview__wrapper {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 767px) {
  .b-stories__preview {
    width: 100%;
    overflow-x: auto;
  }
  .b-stories__preview__wrapper {
    width: calc(((100vw - 15px * 2 - 10px * 2) / 3) * 6 + 10px * 5);
    padding-bottom: 10px;
  }
}
</style>
