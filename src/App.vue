<template>
  <div id="app">
    <VStory
      :imageUrl="activeStory.imageUrl"
      :text="activeStory.text"
      @prev="prevImage"
      @next="nextImage"
      :loading="loading"
      :total="total"
      :activeIndex="activeStoryIndex"
      :duration="duration"
      :elapsedTime="elapsedTime"
    >
    </VStory>
    
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
      elapsedTime: 0,
      duration: 0
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
    createNextPageCountdown (duration) {
      if (this.timer) window.clearTimeout(this.timer)
      if (this.elapsedTimer) window.clearInterval(this.elapsedTimer)
      this.duration = duration
      this.elapsedTime = 0
      

      this.timer = window.setTimeout(async () => {
        if (this.hasNotNextStory) return
        const { duration } = await this.getStoryByIndex(++this.activeStoryIndex)
        this.createNextPageCountdown(duration)
      }, duration)
    },
    async prevImage () {
      if (this.hasNotPrevStory) return
      if (this.timer) window.clearTimeout(this.timer)
      const { duration } = await this.getStoryByIndex(--this.activeStoryIndex)
      this.createNextPageCountdown(duration)
    },
    async nextImage () {
      if (this.hasNotNextStory) return
      if (this.timer) window.clearTimeout(this.timer)
      const { duration } = await this.getStoryByIndex(++this.activeStoryIndex)
      this.createNextPageCountdown(duration)
    },
    async init () {
      this.total = getStoriesMeta().length
       const { duration } = await this.getStoryByIndex(this.activeStoryIndex)
       this.createNextPageCountdown(duration)
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
* {
  box-sizing: border-box;
}



</style>
