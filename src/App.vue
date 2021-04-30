<template>
  <div id="app">
    <VStory
      :imageUrl="activeStory.imageUrl"
      :text="activeStory.text"
      @prevImage="prevImage"
      @nextImage="nextImage"
    ></VStory>
    <div class="story__loading"
      v-show="loading"
    >
      loading...
    </div>
  </div>
  
</template>

<script>
import { getStoriesMeta, ajaxGetStoryByIndex } from '@/stories-api.js'
import VStory from '@/components/VStory.vue'
export default {
  name: 'App',
  components: {
    VStory
  },
  data () {
    return {
      stories: [],
      activeStoryIndex: 0,
      loading: false,
      total: 0,
      activeStory: {}
    }
  },
  methods: {
    async prevImage () {
      if (this.activeStoryIndex - 1 < 0) return
      this.activeStoryIndex--
      this.getStoryByIndex(this.activeStoryIndex)
    },
    nextImage () {
      if (this.activeStoryIndex + 1 > this.total) return
      this.activeStoryIndex++
      this.getStoryByIndex(this.activeStoryIndex)
    },

    async init () {
      this.total = getStoriesMeta().length
      this.getStoryByIndex(this.activeStoryIndex)
    },
    async getStoryByIndex (index) {
      this.loading = true
      this.activeStory = await ajaxGetStoryByIndex(index)
      this.loading = false
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
body {
	margin: 0;
}

.story__loading {
  position: fixed;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

</style>
