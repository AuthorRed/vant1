<template>
  <div class="container">
    <div v-if="!this.showMessageItem" class="content">
      <van-nav-bar
        
        left-text="返回"
        left-arrow
        @click-left="back()"
      >
       <template #title>
        <div ref="loading" class="loader-container">
          <div class="loader" :style="{display:loader}">&nbsp;&nbsp;</div>会话
        </div>
      </template>
      </van-nav-bar>
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
              <h3>
                {{ getNickName(toUser)
                }}<span>{{
                  map.get(toUser)[map.get(toUser).length - 1].date | formatDate
                }}</span>
              </h3>
              <span>{{
                map.get(toUser)[map.get(toUser).length - 1].message
              }}</span>
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
import { Toast } from "vant";
export default {
  name: "MessageList",
  data() {
    return {
      loader:'none',
      websock: null,
      user: {},
      list: [],
      showMessageItem: false,
      map: new Map(),
      currentToUser: "",
      currentToUserList: [],
    };
  },
  components: {
    "message-item": MessageItem,
  },
  created() {
    setTimeout(() => {
      this.initWebSocket();
    }, 50);
  },
  destroyed() {
    if(this.websock){
      this.websock.close(); //离开路由之后断开websocket连接
    }
  },
  methods: {
    showLoader(){
      if(this.loader.indexOf('none')>=0){
        this.loader = 'block';
      }
    },
    hideLoader(){
      if(this.loader.indexOf('block')>=0){
        this.loader = 'none';
      }
    },
    getNickName(uid) {
      if (uid == 11) {
        return "小明";
      } else if (uid == 22) {
        return "小红";
      }
    },
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
      if (uid == this.$store.state.user.uid) {
        return;
      }
      let messageItem = {};
      messageItem.from = this.user.uid;
      messageItem.to = uid;
      messageItem.message = "开启对话";
      if (this.map.has(uid)) {
        //如果已经有过会话的直接返回
        return;
      } else {
        //如果没有的，要扩展list
        this.map.set(uid, [messageItem]);
        console.log("map", this.map);
        this.pushMap2List();
        // this.list.push(messageItem);
      }
    },
    initWebSocket() {
      if (!this.$store.state.user) {
        Toast.fail("请先登录才能开启会话！");
        this.$store.commit("setForwardUrl", "/messageList");
        this.$router.push("/me/loginForm");
        return;
      }
      //初始化weosocket
      console.log("uid", this.user.uid);
      this.showLoader();
      const wsuri = "ws://127.0.0.1:8081/webSocket/" + this.user.uid;
      console.log(wsuri);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      this.hideLoader();
      //连接建立之后执行send方法发送数据
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonmessage(e) {
      this.hideLoader();
      //数据接收
      console.log("收到数据", e.data);
      let msg = JSON.parse(e.data);
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
      this.$forceUpdate();
      // if(this.currentToUser==msg.from){
      //   this.currentToUserList.push(msg);
      // }
    },
    websocketonerror() {
      this.showLoader();
      // Toast.fail('会话连接中...');
      //连接建立失败重连
      if (this.$store.state.user) {
        setTimeout(() => {
          this.initWebSocket();
        }, 8000);
      }else{
        this.websock.close();
        Toast.fail("用户已注销，会话关闭");
      }
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
      if(this.websock){
        this.websock.close();
      }
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
    console.log("route seller:", this.$route.query.seller);
    let fromCommodityDisplay = this.$route.query.fromCommodityDisplay;
    if (fromCommodityDisplay) {
      if (fromCommodityDisplay) {
        this.checkIfNewUserToExtend(this.$route.query.seller);
        this.toMessageItem(this.$route.query.seller);
      }
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
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
      width: 100%;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
      }
      .itemWord {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        border-bottom: 1px solid rgb(243, 243, 243);
        background-color: #fff;
        h2 {
          margin: 0.3rem;
          display: inherit;
          color: #383838;
          font-weight: normal;
          font-size: 0.9rem;
        }
        h3 {
          margin: 0.3rem;
          display: flex;
          justify-content: space-between;
          color: black;
          font-weight: normal;
          line-height: 2rem;
          span {
            font-size: 0.5rem;
            color: grey;
          }
        }
        span {
          text-align: start;
          font-size: 0.7rem;
          padding-left: 0.2rem;
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


@keyframes Rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-container{
  display: flex;
  justify-content: center;
  .loader {
    margin-right: .5rem;
    width: 1rem;
    height: 1rem;
    border-top:1px solid black;
    border-bottom:1px solid rgb(243,243,243);
    border-left:1px solid rgb(243,243,243);
    border-right:1px solid black;
    border-radius: 50%;
    animation: Rotate .6s linear infinite;
  }
}

</style>