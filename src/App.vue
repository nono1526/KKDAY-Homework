<template>
  <div id="app">
    <VStory
      :imageUrl="activeStory.imageUrl"
      :text="activeStory.text"
      :loading="loading"
      :total="total"
      :activeIndex="activeStoryIndex"
      :duration="duration"
      @touchstart.prevent="pause"
      @touchend.prevent="resume"
      :isHoldStory="isHoldStory"
      @mousedown.prevent="pause"
      @mouseup.prevent="resume"
      :error="showRetry"
      @retry="retry"
    >
    </VStory>
    
  </div>
  
</template>

<script>
import { getStoriesMeta, ajaxGetStoryByIndexUnstable } from '@/stories-api.js'
import VStory from '@/components/VStory.vue'
export default {
  name: 'App',
  components: {
    VStory
  },
  data () {
    return {
      activeStoryIndex: -1,
      loading: false,
      total: 0,
      activeStory: {},
      startTime: 0,
      duration: 1000,
      lessTime: 0,
      isHoldStory: false,
      elapsedTime: 0,
      startHoldTime: 0,
      showRetry: false,
      stories: [],
      storyId: 0
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
    retry () {
      this.showRetry = false
      this.changeImageByIndex(this.storyId)
    },
    pause (e) {
      if (e.target.classList.contains('story__loading') || e.target.classList.contains('story__retry') || !this.timer) return
      
      this.startHoldTime = new Date().getTime()
      this.elapsedTime = this.startHoldTime - this.startTime // 已經經過時間
      this.lessTime = this.duration - this.elapsedTime // 剩餘多少時間
      this.isHoldStory = true
      window.clearTimeout(this.timer)
    },
    resume (e) {
      if (e.target.classList.contains('story__loading') || e.target.classList.contains('story__retry')) return
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
        this.storyId = this.getRandomIndex()
        this.activeStoryIndex++
        await this.changeImageByIndex(this.storyId)
      }, duration)
    },
    async changeImageByIndex (id) {
      if (this.timer) window.clearTimeout(this.timer)
      const res = await this.getStoryByIndex(id)
      if (!res) {
        this.showRetry = true
        return false
      }
      const { duration } = res
      this.createNextPageCountdown(duration)
    },
    async prevImage () {
      if (this.hasNotPrevStory) return
      this.activeStoryIndex--
      this.storyId = this.stories[this.activeStoryIndex].idx
      await this.changeImageByIndex(this.storyId)
    },
    async nextImage () {
      if (this.hasNotNextStory) return
      this.activeStoryIndex++
      let idx = (this.stories[this.activeStoryIndex] || {}).idx
      if (!idx) idx = this.getRandomIndex()
      this.storyId = idx
      await this.changeImageByIndex(this.storyId)
    },
    async init () {
      const MAX_STORIES = 6
      const { length, weightList } = getStoriesMeta()
      this.total = Math.min(length, MAX_STORIES)
      this.weightTable = []
      weightList.forEach((weight, idx) => {
        for (let i = 0; i < weight; i++) {
          this.weightTable.push(idx)
        }
      })
      this.storyId = this.getRandomIndex()
      this.activeStoryIndex++
      await this.changeImageByIndex(this.storyId)
    },
    getRandomIndex () {
      const weightIndex = Math.floor(Math.random() * this.weightTable.length)
      const rndIndex = this.weightTable[weightIndex]
      this.weightTable = this.weightTable.filter(idx => idx !== rndIndex)
      return rndIndex
    },
    async getStoryByIndex (index) {
      this.loading = true
      let story
      if (this.stories.find(story => story.idx === index)) {
        story = this.stories[this.activeStoryIndex]
      } else {
         story = await ajaxGetStoryByIndexUnstable(index)
         if (!story) return false
         story.idx = index
         this.stories.push(story)
         
      }
      this.activeStory = story
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
#app {
  background-color: #414141;
}

</style>
