<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  line-height: 1;
  font-family: PingFangSC-Light, helvetica neue, hiragino sans gb, tahoma, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
}
::-webkit-scrollbar {
    width: 0;
    height: 0
}
@font-face {
  font-family: Langdon;
  src: url(require('@/assets/Langdon.otf'));
}
.highlight{
  color:#f90;
  margin-right: 0.3em;
  text-transform: uppercase;
  font-family: Langdon;
}
</style>
