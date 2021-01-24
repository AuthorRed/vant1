<template>
  <div class="container">
    <div class="back-arrow" @click="back()"><h1>&lt;</h1></div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="uid"
        name="uid"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { validator: asyncValidator, message: '用户名已注册' },
        ]"
      />
      <van-field
        v-model="nickName"
        name="nickName"
        label="昵称"
        placeholder="昵称"
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
        <van-button round block type="info" 
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { getRequest, postFile, postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "",
      pwd: "",
      nickName: "",
    };
  },
  name: "RegisterForm",

  methods: {
    onSubmit(values) {
      console.log("onSubmit", values);
      var fd = new FormData();
      fd.uid = this.uid;
      fd.pwd = this.pwd;
      fd.nickName = this.nickName;
      console.log("fd", fd);
      postRequest("http://localhost:8080/user/register",fd).then(res=>{
        console.log("res.data", res.data);
      });
    },
    back() {
      this.$router.go(-1);
    },
    // 异步校验函数返回 Promise
    asyncValidator(uid) {
      console.log(uid);
      getRequest("http://localhost:8080/user/countUID?uid=" + uid).then(
        (res) => {
          console.log(res.data);
          let payload = res.data;
          if (200 == payload.code && payload.extenal.countUID == 0) {
            Toast.success("用户名可以使用！");
          } else {
            console.log(this.uid);
            this.uid = "";
            Toast.fail("用户名已存在，请更换！");
          }
        }
      );
    },
  },
  mounted() {
    console.log("mounted-LoginRegisterFormForm");
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