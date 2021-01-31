<template>
  <div id="app">
    <router-view></router-view>

    <div class="down">
      <div class="down-tab">
      <router-link to="/" tag="a">home</router-link>

      <router-link to="/about" tag="a">about</router-link>
      <router-link to="/me" tag="a">我</router-link>
      <router-link to="/commodity" tag="a">商品</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
.down {
  position: absolute;
  bottom : 1rem;
  width: 100%;
}
.down-tab {
  display: flex;
  justify-content: space-around;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
