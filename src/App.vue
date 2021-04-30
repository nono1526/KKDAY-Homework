<template>
  <div id="app">
    <VStory
      :imageUrl="activeStory.imageUrl"
      :text="activeStory.text"
      @prev="prevImage"
      @next="nextImage"
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
      activeStory: {},
    }
  },
  computed: {
    hasNotNextStory () {
      return this.activeStoryIndex + 1 > this.total - 1
    },
    hasNotPrevStory () {
      return this.activeStoryIndex - 1 < 0
    },
  },
  methods: {
    setNextPageCountdown (duration) {
      if (this.timer) window.clearTimeout(this.timer)
      this.duration = duration
      this.timer = window.setTimeout(async () => {
        if (this.hasNotNextStory) return
        const { duration } = await this.getStoryByIndex(++this.activeStoryIndex)
        this.setNextPageCountdown(duration)
      }, duration)
    },
    async prevImage () {
      if (this.hasNotPrevStory) return
      if (this.timer) window.clearTimeout(this.timer)
      const { duration } = await this.getStoryByIndex(--this.activeStoryIndex)
      this.setNextPageCountdown(duration)
    },
    async nextImage () {
      if (this.hasNotNextStory) return
      if (this.timer) window.clearTimeout(this.timer)
      const { duration } = await this.getStoryByIndex(++this.activeStoryIndex)
      this.setNextPageCountdown(duration)
    },
    async init () {
      this.total = getStoriesMeta().length

       const { duration } = await this.getStoryByIndex(this.activeStoryIndex)
       this.setNextPageCountdown(duration)
    },
    async getStoryByIndex (index) {
      this.loading = true
      this.activeStory = await ajaxGetStoryByIndex(index)
      this.loading = false
      return this.activeStory
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.clearTimeout(this.timer)
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
