<template>
  <div class="story"
    v-on="$listeners"
  >
		<div
      class="story__wrapper"
      :style="{
        backgroundImage: `url(${imageUrl})`
      }">
      <div class="story__header">
        <div
          v-for="(num, i) in total"
          :key="num"
          class="story__header-tile"
          :class="{
            'story__header-tile--readed': activeIndex > i
          }"
        >
          <div
            class="story__header-tile-fill"
            :class="{
              'story__header-tile-fill--active': i === activeIndex,
            }"
            :style="{
              'animation-duration': `${duration/1000}s`,
              'animation-play-state': loading || isHoldStory ? 'paused' : 'running'
            }"
          >
          
          </div>
        </div>
      </div>
			<div class="story__text">
				{{ text }}
			</div>
      <div class="story__left"
        @click="$emit('prev')"
      ></div>
      <div class="story__right"
        @click="$emit('next')"
      ></div>
      <div class="story__loading"
        v-show="loading"
      >
        Loading...
      </div>
		</div>
    
	</div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number
    },
    activeIndex: {
      type: Number
    },
    duration: {
      type: Number
    },
    isHoldStory: {
      type: Boolean
    }
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.story {
	height: 100vh;
  user-select: none;
  @media screen and (min-width: 524px) {
    max-width: 56.25vh;
    margin-left: auto;
    margin-right: auto;
  }
}

.story__wrapper {
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
  user-select: none;
}

.story__right {
  content: '';
  height: 100%;
  position: absolute;
  width: 50%;
  left: 50%;
  top: 0;
  user-select: none;
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
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  height: 100%;
}


.story__loading {
  position: absolute;
  z-index: 1;
  background-color: #313131;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
}

.story__header {
  display: flex;
  position: absolute;
  padding: 16px;
  top: 0;
  width: 100%;
  z-index: 2;
  &-tile {
    flex: 1;
    min-width: 0;
    height: 3px;
    margin: 0 2px;
    background-color: rgba(#fff, .5);
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    &--readed {
      background-color: #fff;
    }
  }
  &-tile-fill {
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background-color: #fff;
    &--active {
      animation-name: growthWidth;
      animation-timing-function: linear;
      animation-play-state: paused;
      animation-fill-mode: forwards;
    }
  }
}


@keyframes growthWidth {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>