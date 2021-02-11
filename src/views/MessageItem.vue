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
        <div class="others">
          <span>{{ item.from }}:</span>
          <span>{{ item.message }}</span>
          <span>{{ item.date|formatDate }}</span>
        </div>
      </div>
    </div>
    <div class="inputArea">
      <input v-model="message" type="text"  @keyup.enter="send()"/>
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
  },
  methods: {
    send() {
      let data = {};
      data.message = this.message;
      data.from = this.user.uid;
      (data.to = this.to), this.$parent.websocketsend(data);
      this.message = "";
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
      this.$parent.currentToUser='';
      this.$parent.currentToUserList=[];
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

.inputArea {
  position: fixed;
  bottom: 0rem;
  width: 100%;
  input {
    width: 70%;
  }
}
.others {
  display: flex;
  justify-content: space-between;
}
</style>