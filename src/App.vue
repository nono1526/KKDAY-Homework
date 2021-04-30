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

#stories {
	height: 100vh;

}

.story {
	height: 100%;
	background-size: cover;
	background-position: center;
	position: relative;
}

.story__left {
  content: '';
  height: 100%;
  position: absolute;
  width: 50%;
  left: 0;
  top: 0;
}

.story__right {
  content: '';
  height: 100%;
  position: absolute;
  width: 50%;
  left: 50%;
  top: 0;
}

.story__text {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 100px 16px 100px;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
	text-align: center;
	font-size: 24px;
	color: #FFF;
	line-height: 1.5;
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
