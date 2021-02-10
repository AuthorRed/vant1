<template>
  <div class="container">
    <div v-if="$route.path == '/messageList'" class="content">
      <van-nav-bar
        title="消息"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
      <div class="list">
        <a
          v-for="item in list"
          :key="item.to"
          class="listItem"
          href="javascript:void(0)"
          @click="toMessageItem(item.to)"
        >
          <div class="itemBox">
            <img
              v-if="item.img_id"
              :src="'http://localhost:8080/file/getFileById?id=' + item.img_id"
            />
            <img v-if="!item.img_id" src="/assets/logo.png" />
            <div class="itemWord">
              <h2>{{ item.from }}</h2>
              <h3>{{ item.to }}</h3>
              <p>{{ item.date }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";
export default {
  name: "MessageList",
  data() {
    return {
      websock: null,
      user: {},
      list: [],
    };
  },
  created() {
    setTimeout(() => {
      this.initWebSocket();
    }, 1000);
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    }, 
  methods: {
    initWebSocket(){ //初始化weosocket
        console.log('uid',this.user.uid);
        const wsuri = "ws://127.0.0.1:8081/webSocket/"+this.user.uid;
        console.log(wsuri);
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        // this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        console.log('收到数据',e.data);
        this.list.push(e.data);
      },
      websocketsend(){//数据发送
        let data={};
        data.message = '测试手动发送。。';
        data.from = this.user.uid;
        data.to = '22',
        this.websock.send(JSON.stringify(data));
        // this.message='';
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    back() {
      this.$router.go(-1);
    },
    toMessageItem(to){
      this.$router.push({
          name:"MessageItem",
          params:{
            to:to
          }
        });
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
    setTimeout(() => {
      this.websocketsend();
    }, 2000);
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
        width: 7rem;
        height: 7rem;
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