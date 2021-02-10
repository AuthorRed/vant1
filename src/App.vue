<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>

      <div class="down"
        v-if="
          $route.path == '/me' ||
          $route.path == '/' ||
          $route.path == '/home' ||
          $route.path == '/about' ||
          $route.path == '/messageList'
        "
      >
        <div class="down-tab">
          <router-link to="/" tag="a">home</router-link>
          <router-link to="/about" tag="a">about</router-link>
          <router-link to="/messageList" tag="a">消息</router-link>
          <router-link to="/me" tag="a">我</router-link>
          <!-- <router-link to="/commodity" tag="a">商品</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    HelloWorld,
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style>
.down {
  position: absolute;
  bottom: 1rem;
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
  /* margin-top: 1.5rem; */
}
</style>
