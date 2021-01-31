<template>
  <div class="container">
    <div class="back-arrow" @click="back()"><h1>&lt;</h1></div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="uid"
        name="uid"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "",
      pwd: "",
    };
  },
  name: "LoginForm",

  methods: {
    onSubmit(values) {
      console.log("submit", values);
      var fd = new FormData();
      fd.uid = this.uid;
      fd.pwd = this.pwd;
      console.log("fd", fd);
      postRequest("/user/login",fd).then(res=>{
        console.log("res.data", res.data);
        if(200==res.data.code){
          let user = res.data.extenal.user;
          sessionStorage.setItem("user", JSON.stringify(res.data.extenal.user)); 
          Toast.success("登录成功！");
          this.$router.push('/me?rgs=true');
        }else{
          Toast.fail(res.data.msg);
        }
      });
    },

    back() {
      this.$router.push("/me");
    },
  },
  mounted() {
    console.log("mounted-LoginForm");
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
</style>