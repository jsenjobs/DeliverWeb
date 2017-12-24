<template>
  <div id="home" class="jse">
    <router-view class='router'></router-view>
  </div>
</template>

<script>
export default {
  name: 'jabeta',
  methods: {
  },
  mounted() {
  }
}
</script>

<style>
html body {
  user-select:text;
}
html,body{
  height: 100%;
}
#id {
	padding: 0px;
}
.jse {
	width: 100%;
	height: 100%;
	padding: 0px;
}
.canvas {
  position: fixed;
  z-index: 1;
  pointer-events:none;
}
@import "../static/css/main.css";
/*@import "../static/css/color-dark.css";     深色主题*/
@import "../static/css/theme-green/color-green.css";   /*浅绿色主题*/
@import "../static/css/custom.css";
</style>
