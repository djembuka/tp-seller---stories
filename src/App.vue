<template>
  <div class="container-fluid">
    <stories-preview></stories-preview>
    <stories-modal></stories-modal>
  </div>
</template>

<script>
import StoriesPreview from './components/StoriesPreview.vue';
import StoriesModal from './components/StoriesModal.vue';

export default {
  name: 'App',
  components: {
    StoriesPreview,
    StoriesModal,
  },
  beforeMount() {
    //set stories as watched
    Object.keys(this.$store.state.localStorageObject).forEach((key) => {
      this.$store.state.stories.find((s) => s.id === key).watched = true;
    });
  },
};
</script>

<style></style>
