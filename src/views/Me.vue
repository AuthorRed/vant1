<template>
  <div class="me">
    <div v-if="$route.path=='/me'" class="container">
      <div>
        <div class="currentUser">

          <img src="../assets/logo.png" alt="" >
          <h2>{{$store.state.user ? $store.state.user.uid:'未登录'}} &nbsp;&nbsp;&nbsp; <van-icon name="setting-o" @click="logout()"/></h2>
          
          </div>
        <div class="collections"> 收藏|评价</div>
      </div>
      <router-link to="/me/loginForm" tag="a">
      <van-divider />
        <van-cell title="登录" is-link />
      </router-link>
      <router-link to="/me/registerForm" tag="a">
        <van-cell title="注册" is-link />
      </router-link>
      <!-- <router-link to="/me/commodityList" tag="a">
        <van-cell title="商品服务列表" is-link />
      </router-link> -->
      <!-- <router-link v-if="$store.state.user" to="/me/orderList" tag="a">
        <van-cell title="订单" is-link />
      </router-link> -->
      <router-link v-if="$store.state.user" :to="'/me/shop/'+$store.state.user.uid" tag="a">
        <van-cell title="我的店铺" is-link />
      </router-link>
    </div>
    <transition name="slide">
      <keep-alive include="Shop,OrderList"> 
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { getRequest, postFile, postRequest } from "@/api/http.js";
export default {
  data() {
    return {
      title: "个人页面",
    };
  },
  name: "me",
  computed: {
    userTitle: {
      get:function () {
        let userTitle = "个人页面";
        if (this.$store.state.user) {
          userTitle =userTitle+ ":" + this.$store.user.nickName;
        }
        return userTitle;
      },
      set:function(user){

      }
    }
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    logout(){
      this.$store.commit('setUser',null);
    },
  },
  mounted() {
  },
  watch: {
    // $route(to, from) {
    //   console.log("from ", from); //从哪来
    //   console.log("to ", to); //到哪去
    //   if ("true" == to.query.rgs) {
    //     console.log("to.query.rgs ", to.query.rgs);
    //     let user = {};
    //     let item = sessionStorage.getItem("user");
    //     try {
    //       user = JSON.parse(item);
    //     } catch (error) {
    //       console.log("error ", error);
    //     }
    //     if (user) {
    //       this.user = user;
    //     }
    //   }
    // },
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

.currentUser {
    background-color: #fff;
    height: 15vh;
    img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
  }
}
.collections {
    background: #fff;
    height: 6vh;
}
</style>