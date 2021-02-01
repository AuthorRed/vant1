<template>
  <div class="container">
    <van-nav-bar title="商品" left-text="返回" right-text="添加商品" left-arrow @click-left="back()"  @click-right="commodityAdd"/>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
     
      <ul>
        <li v-for="item in list" :key="item" :title="item" >
          {{item}}
        </li>
      </ul>
    </van-list>
  </div>
</template>
<script>
import { postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  name: "CommodityList",

  methods: {
    back() {
      this.$router.push("/me");
    },
    commodityAdd(){
      this.$router.push("/me/commodityList/commodityAdd");
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 3) {
          this.finished = true;
        }
      }, 1000);
    },

  },
  mounted() {
    console.log("mounted-CommodityList");
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