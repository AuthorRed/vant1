<template>
  <div class="container">
    <van-nav-bar
      title="添加商品"
      left-text="返回"
      left-arrow
      @click-left="back()"
    />
    <div class="msgArea">
      <div v-for="(item, index) in msgList" :key="index">
        <div v-if="item.from == $parent.user.uid" class="mine">
          <img src="../assets/customservice.jpg" alt="" />
          <p>{{ item.message }}</p>
        </div>

        <div v-if="item.from != $parent.user.uid" class="others">
          <img src="../assets/logo.png" alt="" />
          <p>{{ item.message }}</p>
        </div>
      </div>
    </div>
    <div class="inputArea">
      <input v-model="message" type="text" @keyup.enter="send()" />
      <button @click="send">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageItem",
  props: {
    to: String,
    msgList: Array,
  },
  data() {
    return {
      // to: "",
      user: {},
      seller: "",
      message: "",
      // msgList: [],
    };
  },
  mounted() {
    // this.to = this.$route.params.to;
    // console.log("to", this.to);
    this.getUser();
    this.scrollToBottom();
  },
  //每次页面渲染完之后滚动条在最底部
  updated:function(){
    this.scrollToBottom();
  },
  methods: {
    send() {
      let data = {};
      data.message = this.message;
      data.from = this.user.uid;
      (data.to = this.to), this.$parent.websocketsend(data);
      this.message = "";
    },
    scrollToBottom: function () {
     this.$nextTick(() => {
	    var container = this.$el.querySelector(".msgArea");
        container.scrollTop = container.scrollHeight;
     })
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
    back() {
      this.$parent.currentToUser = "";
      this.$parent.currentToUserList = [];
      if (this.$parent.showMessageItem) {
        this.$parent.showMessageItem = false;
      }
    },
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

.msgArea {
  /* position: absolute;
  top: 3rem; */
  height: 88vh;
  box-sizing: border-box;
  overflow: scroll;
  background-color: rgb(243,243,243);
}
  .others {
  display: flex;
  justify-content: start;
  padding: 0.2rem;
  width: 82%;
  p {
    background-color: #fff;
    border-radius: 0.3rem;
    line-height: 2rem;
    text-align: justify;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    font-size: .8rem;
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
  }
}
.mine {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  width: 100%;
  padding-top: 0.2rem;
  p {
    background-color: #fff;
    border-radius: 0.3rem;
    line-height: 2rem;
    text-align: justify;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    margin-left: 2.2rem;
    font-size: .8rem;
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
  }
}


.inputArea {
  position: absolute;
  background-color: rgb(243,243,243);
  height: 5vh;
  width: 100%;
  input {
    width: 80%;
    padding: .3rem;
    border-radius: .3rem;
  }
  button {
    background-color: #fff;
    border: .1rem;
    padding: 0.4rem;
    border-radius: 0.5rem;
    font-size: .9rem;
  }
}

::-webkit-scrollbar {
    // width: 5px;
    // height: 5px;
}
 
::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}
 
::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}
 
::-webkit-scrollbar-thumb:horizontal {
    width: 0;
    // background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 0;
}
</style>