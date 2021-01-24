<template>
  <div class="container">
    <div class="back-arrow" @click="back()"><h1>&lt;</h1></div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="密码"
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
export default {
  data() {
    return {
      username: '',
      pwd: '',
    };
  },
  name: "LoginForm",

  methods: {
 onSubmit(values) {
      console.log('submit', values);
    },

    back() {
      this.$router.go(-1);
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