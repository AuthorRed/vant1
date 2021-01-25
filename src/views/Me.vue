<template>
  <div class="me">
    <h1>个人页面:{{user?user.nickName:'未登录!'}}</h1>
      <router-link to="/me/loginForm" tag="a">
      <div class="cell">
        <div class="title"><span>登录</span></div>
        <div class="islink"><span>&gt;</span></div>
      </div>
      </router-link>
      <router-link to="/me/registerForm" tag="a">
      <div class="cell">
        <div class="title"><span>注册</span></div>
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
  data() {
    return {
      user: "",
    };
  }, 
  name: "me",
  // components: {
  //   EmojiPicker
  // }
  methods: {},
  mounted() {
    let user = {};
    try {
       user = JSON.parse(sessionStorage.getItem("user"));
    } catch (error) {
      console.log(error)
    }
    this.user=user;
    // if(user){
    //   console.log("user:",true);
    //   console.log("user-true:",user);
    // }else{
    //   console.log("user:",false);
    //   console.log("user-false:",user);
    // }

  },
  watch:{
    $route(to,from){
      console.log('from ',from);//从哪来
      console.log('to ',to);//到哪去
      if('true'==to.query.rgs){
        console.log('to.query.rgs ',to.query.rgs);
        let user = {};
        let item = sessionStorage.getItem('user');
        try {
          user = JSON.parse(item);
        } catch (error) {
          console.log('error ',error);
        }
        if(user){
          this.user = user;
        }
      }
    }
}
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