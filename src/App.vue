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
        <!-- <div class="down-tab">
          <router-link to="/" tag="a">home</router-link>
          <router-link to="/about" tag="a">about</router-link>
          <router-link to="/messageList" tag="a">消息</router-link>
          <router-link to="/me" tag="a">我</router-link>
        </div> -->

        <van-tabbar v-model="active">
          <van-tabbar-item name='home' icon="home-o" to="/">home</van-tabbar-item>
          <van-tabbar-item name='about'  icon="search" to="/about">about</van-tabbar-item>
          <van-tabbar-item name='message'  icon="chat-o" to="/messageList">消息</van-tabbar-item>
          <van-tabbar-item name='me' icon="user-o" to="/me">我</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "app",
  data(){
    return {
      active: 'home',
    }
  },
  components: {
    HelloWorld,
  },
  methods: {
    readSessionUser2Store(){
      if(!this.$store.state.user){
        let user = sessionStorage.getItem("user"); 
        if (user) {
          let userObject = JSON.parse(user);
          this.$store.commit('setUser',userObject);
        }
      }
    },
  },
  mounted() {
    this.readSessionUser2Store();
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
