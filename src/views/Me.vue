<template>
  <div class="me">
    <!-- <h1>个人页面:{{user?user.nickName:'未登录!'}}</h1> -->
    <div v-if="$route.path=='/me'" class="container">
      <van-nav-bar
        :title="userTitle"
        left-text="返回"
        left-arrow
        @click-left="back()"
      ></van-nav-bar>
      <router-link to="/me/loginForm" tag="a">
        <van-cell title="登录" is-link />
      </router-link>
      <router-link to="/me/registerForm" tag="a">
        <van-cell title="注册" is-link />
      </router-link>
      <router-link to="/me/commodityList" tag="a">
        <van-cell title="商品服务列表" is-link />
      </router-link>
      <router-link to="/me/registerForm" tag="a">
        <van-cell title="单元格" is-link />
      </router-link>
    </div>
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
      user: {},
      title: "个人页面",
    };
  },
  name: "me",
  computed: {
    userTitle: {
      get:function () {
        let userTitle = "个人页面";
        if (this.user) {
          userTitle =userTitle+ ":" + this.user.nickName;
        }
        return userTitle;
      },
      set:function(){

      }
    }
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    getUser(){
      let user = {};
      const cacheUser = sessionStorage.getItem("user");
      if(cacheUser){
        try {
          user = JSON.parse(cacheUser);
        } catch (error) {
          console.log(error);
        }
        this.user = user;
        this.seller = user.uid;
      };
    }
  },
  mounted() {
    this.getUser();
  },
  watch: {
    $route(to, from) {
      // console.log("from ", from); //从哪来
      // console.log("to ", to); //到哪去
      if ("true" == to.query.rgs) {
        console.log("to.query.rgs ", to.query.rgs);
        let user = {};
        let item = sessionStorage.getItem("user");
        try {
          user = JSON.parse(item);
        } catch (error) {
          console.log("error ", error);
        }
        if (user) {
          this.user = user;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.slide-enter,
.slide-leave-to {
  right: -100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.15s linear;
}
.slide-enter-to,
.slide-leave {
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