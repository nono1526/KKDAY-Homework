<template>
  <div id="story" >
		<div
      class="story__wrapper"
      :style="{
        backgroundImage: `url(${imageUrl})`
      }">
			<div class="story__text">
				{{ text }}
			</div>
      <div class="story__left"
        @click="$emit('prevImage')"
      ></div>
      <div class="story__right"
        @click="$emit('nextImage')"
      ></div>

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
    }
  }
}
</script>

<style lang="scss" scoped>
#story {
	height: 100vh;
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
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>