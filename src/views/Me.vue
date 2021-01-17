<template>
  <div class="me">
    <h1>个人页面</h1>
      <router-link to="/me/cellContent" tag="a">
      <div class="cell">
        <div class="title"><span>我的cell</span></div>
        <div class="islink"><span>&gt;</span></div>
      </div>
      </router-link>
    <transition name="slide">
      <router-view></router-view>
    </transition>
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
.slide-enter, .slide-leave-to{
  right: -100%;
}
.slide-enter-active, .slide-leave-active{
  transition: right .15s linear;
}
.slide-enter-to, .slide-leave{
  right: 0;
}


.van-cell__title {
    display: flex;
    justify-content: start;
    padding-left: 2rem;
}
.cell {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ebedf0;
  padding: 1rem;
  .title {
    width: 90%;
    margin-left: 1rem;
    text-align: start;
  }
  .islink {
    width: 10%;
  }

}
</style>