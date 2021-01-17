<template>
  <div class="me">
    <h1>个人页面</h1>

    <div class="down-tab">
      <router-link to="/" tag="a">home</router-link>
      <router-link to="me" tag="a">我</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { getRequest, postFile, postRequest } from "@/api/http.js";
export default {
  name: "me",
  // components: {
  //   EmojiPicker
  // }
  methods: {},
  mounted() {
    console.log("mounted");
  },
};
</script>
<style lang="less" scoped>
</style>