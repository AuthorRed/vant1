<template>
  <div class="container">
    <div v-if="!this.showMessageItem" class="content">
      <van-nav-bar
        title="消息"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
      <button @click="checkIfNewUserToExtend('11')">添加与11对话</button>
      <button @click="checkIfNewUserToExtend('22')">添加与22对话</button>
      <button @click="checkIfNewUserToExtend('33')">添加与33对话</button>

      <div class="list">
        <a
          v-for="toUser in list"
          :key="toUser"
          class="listItem"
          href="javascript:void(0)"
          @click="toMessageItem(toUser)"
        >
          <div class="itemBox">
            <img
              v-if="toUser.img_id"
              :src="
                'http://localhost:8080/file/getFileById?id=' + toUser.img_id
              "
            />
            <img v-if="!toUser.img_id" src="../assets/logo.png" />
            <div class="itemWord">
              <h3>to:{{ toUser }}</h3>
            </div>
          </div>
        </a>
      </div>
    </div>
    <transition name="slide">
      <!-- <router-view></router-view> -->
      <message-item
        v-if="this.showMessageItem"
        :to="currentToUser"
        :msgList="currentToUserList"
      ></message-item>
    </transition>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";
import MessageItem from "@/views/MessageItem.vue";
export default {
  name: "MessageList",
  data() {
    return {
      websock: null,
      user: {},
      list: [],
      showMessageItem: false,
      map: new Map(),
      currentToUser: "",
      currentToUserList:[],
    };
  },
  components: {
    "message-item": MessageItem,
  },
  created() {
    setTimeout(() => {
      this.initWebSocket();
    }, 1000);
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    pushMap2currentToUserList() {
      this.list = [];
      for (let key of this.map.keys()) {
        this.list.push(key);
      }
    },
    pushMap2List() {
      this.list = [];
      for (let key of this.map.keys()) {
        this.list.push(key);
      }
    },
    checkIfNewUserToExtend(uid) {
      let messageItem = {};
      messageItem.from = this.user.uid;
      messageItem.to = uid;
      messageItem.message = '开启对话';
      if(this.map.has(uid)){
        //如果已经有过会话的直接返回
        return
      }else{
        //如果没有的，要扩展list
        this.map.set(uid, [messageItem]);
        console.log("map", this.map);
        this.pushMap2List();
        // this.list.push(messageItem);
      }
    },
    initWebSocket() {
      //初始化weosocket
      console.log("uid", this.user.uid);
      const wsuri = "ws://127.0.0.1:8081/webSocket/" + this.user.uid;
      console.log(wsuri);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonmessage(e) {
      //数据接收
      console.log("收到数据", e.data);
      let msg = JSON.parse(e.data) ;
      if (!msg || !msg.from) {
        console.log("信息来源缺失");
        return;
      }
      if (this.map.has(msg.from)) {
        let userMsgList = this.map.get(msg.from);
        userMsgList.push(msg);
      } else {
        this.map.set(msg.from, [msg]);
        this.pushMap2List();
      }
      // if(this.currentToUser==msg.from){
      //   this.currentToUserList.push(msg);
      // }
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    
    websocketsend(data) {
      let currentToUserList = this.map.get(data.to);
      currentToUserList.push(data);
      this.currentToUserList = currentToUserList;
      //数据发送
      this.websock.send(JSON.stringify(data));
      console.log("发送信息", JSON.stringify(data));
      // this.message='';
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    back() {
      this.$router.go(-1);
    },
    toMessageItem(to) {
      this.currentToUser = to;
      this.currentToUserList = this.map.get(to);
      this.showMessageItem = true;
      /* this.$router.push({
          name:"MessageItem",
          params:{
            to:to
          }
        }); */
    },
    getUser() {
      let user = {};
      const cacheUser = sessionStorage.getItem("user");
      if (cacheUser) {
        try {
          user = JSON.parse(cacheUser);
        } catch (error) {
          console.log(error);
        }
        this.user = user;
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style lang="less" scoped>
.slide-enter,
.slide-leave-to {
  right: -100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.15s linear;
}
.slide-enter-to,
.slide-leave {
  right: 0;
}

.container {
  width: 100%;

  background: rgb(243, 243, 243);
  position: absolute;
  top: 0;
  z-index: 99;
}

.list {
  .listItem {
    display: flex;
    position: relative;
    width: 100%;
    .itemBox {
      display: flex;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
      }
      .itemWord {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        h2 {
          margin: 0.3rem;
          display: inherit;
          color: #383838;
          font-weight: normal;
          font-size: 0.9rem;
        }
        h3 {
          margin: 0.3rem;
          display: inherit;
          color: #fc4a3c;
          font-weight: normal;
        }
        p {
          margin: 0.3rem;
          display: inherit;
          color: #9a9a9a;
          font-weight: normal;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>