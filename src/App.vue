<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>

      <div
        v-if="
          $route.path == '/me' ||
          $route.path == '/' ||
          $route.path == '/home' ||
          $route.path == '/about'
        "
        class="down"
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
  computed: {
    websocket() {
      return this.$store.state.websocket;
    },
  },
  methods: {
    initWebsocket() {
      console.log('直接调用成功。。你在哪里都可以调用这个方法');
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebsocket();
    },
    websocketonmessage(e) {
      //数据接收
      console.log("收到数据", e.data);
      this.msgList.push(e.data);
    },
    websocketsend() {
      //数据发送
      console.log("seller", this.seller);
      let data = {};
      data.message = this.message;
      data.from = this.user.uid;
      data.to = this.seller;
      this.websock.send(JSON.stringify(data));
      this.message = "";
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
  mounted() {
    this.initWebsocket();
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
