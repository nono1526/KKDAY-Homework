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
      @touchstart.prevent="pause"
      @touchend="resume"
      :isHoldStory="isHoldStory"
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
      startTime: 0,
      duration: 0,
      lessTime: 0,
      isHoldStory: false,
      elapsedTime: 0,
      startHoldTime: 0
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
    pause () {
      this.startHoldTime = new Date().getTime()
      this.elapsedTime = this.startHoldTime - this.startTime // 已經經過時間
      this.lessTime = this.duration - this.elapsedTime // 剩餘多少時間
      this.isHoldStory = true
      window.clearTimeout(this.timer)
    },
    resume (e) {
      const nowTime = new Date().getTime()
      this.isHoldStory = false
      if (nowTime - this.startHoldTime < 100) {
        if (e.target.classList.contains('story__left')) {
          this.prevImage()
        }
        if (e.target.classList.contains('story__right')) {
          this.nextImage()
        }
        return
      }
      this.startTime = nowTime - this.elapsedTime
      this.timer = window.setTimeout(() => this.nextImage(), this.lessTime)

      
    },
    createNextPageCountdown (duration) {
      if (this.timer) window.clearTimeout(this.timer)
      if (this.elapsedTimer) window.clearInterval(this.elapsedTimer)
      this.duration = duration
      this.startTime = new Date().getTime()

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
