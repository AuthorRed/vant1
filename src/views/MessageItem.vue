<template>
  <div class="container">
    <van-nav-bar
      title="添加商品"
      left-text="返回"
      left-arrow
      @click-left="back()"
    />
    <div class="msgArea">
      <div v-for="(item,index) in msgList" :key="index">
        {{item}}
      </div>
    </div>
    <div class="inputArea">
      <input v-model="message" type="text">
      <button @click="websocketsend">发送</button>
    </div>
  </div>
</template>
<script>
export default {
    name : 'test',
    data() {
      return {
        user: {},
        websock: null,
        seller:'',
        message:'',
        msgList:[],
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    mounted(){
      this.seller = this.$route.params.seller;
      console.log('seller',this.seller);
      this.getUser();
    },
    methods: {
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
      back() {
      this.$router.go(-1);
      },
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://127.0.0.1:8081/webSocket/22";
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
        this.msgList.push(e.data);
      },
      websocketsend(){//数据发送
      console.log('seller',this.seller);
        let data={};
        data.message = this.message;
        data.from = this.user.uid;
        data.to = this.seller;
        this.websock.send(JSON.stringify(data));
        this.message='';
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
  }
</script>
<script>
/* export default {
    name : 'test',
    data() {
      return {
        user: {},
        websock: null,
        seller:'',
        message:'',
        msgList:[],
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    mounted(){
      this.seller = this.$route.params.seller;
      console.log('seller',this.seller);
      this.getUser();
    },
    methods: {
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
      back() {
      this.$router.go(-1);
      },
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://127.0.0.1:8081/webSocket/22";
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
        this.msgList.push(e.data);
      },
      websocketsend(){//数据发送
      console.log('seller',this.seller);
        let data={};
        data.message = this.message;
        data.from = this.user.uid;
        data.to = this.seller;
        this.websock.send(JSON.stringify(data));
        this.message='';
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
  } */
</script>
<style lang="less" scoped>
.container {
  .back-arrow {
    display: flex;
    box-sizing: border-box;
    padding: 1rem;
  }
  width: 100%;

  background: rgb(243, 243, 243);
  position: absolute;
  top: 0;
  z-index: 99;
}

.inputArea {
  position: fixed;
  bottom : 0rem;
  width: 100%;
    input {
      width: 70%;
    }

}

</style>