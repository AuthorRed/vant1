<template>
  <div class="container">
    <van-nav-bar title="注册" left-text="返回" right-text="按钮" left-arrow @click-left="back()"/>
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
        v-model="role"
        name="role"
        label="角色"
      >
        <template #input>
          <van-radio-group v-model="role" direction="horizontal">
            <van-radio name="BUYER">买家</van-radio>
            <van-radio name="SELLER">卖家</van-radio>
          </van-radio-group>
        </template>
      
      </van-field>

      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getRequest, postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "",
      pwd: "",
      nickName: "",
      role: "",
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
      fd.nickName = this.nickName;
      console.log("fd", fd);
      postRequest("/user/register", fd).then((res) => {
        console.log("res.data", res.data);
        if (200 == res.data.code) {
          let user = res.data.extenal.user;
          sessionStorage.setItem("user", JSON.stringify(res.data.extenal.user));
          Toast.success("注册成功！");
          this.$router.push("/me?rgs=true");
        } else {
          Toast.fail("注册失败:" + res.data.msg);
        }
      });
    },
    back() {
      this.$router.push("/me?rgs=false");
    },
    // 异步校验函数返回 Promise
    asyncValidator(uid) {
      //console.log(uid);
      getRequest("/user/countUID?uid=" + uid).then((res) => {
        //console.log(res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.countUID == 0) {
          Toast.success("用户名可以使用！");
        } else {
          //console.log(this.uid);
          this.uid = "";
          Toast.fail("用户名已存在，请更换！");
        }
      });
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