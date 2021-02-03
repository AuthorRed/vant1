<template>
  <div class="baseContainer">
    <div v-if="$route.path=='/me/commodityList'" class="content">
      <van-nav-bar
        title="商品"
        left-text="返回"
        right-text="添加商品"
        left-arrow
        @click-left="back()"
        @click-right="commodityAdd"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul>
          <li v-for="item in list" :key="item" :title="item">
            {{ item }}
          </li>
        </ul>
      </van-list>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      finished: false,
    };
  },
  name: "CommodityList",

  methods: {
    back() {
      this.$router.push("/me");
    },
    commodityAdd() {
      this.$router.push("/me/commodityList/commodityAdd");
    },
    onLoad() {
      console.log("loading..");
    },
  },
  mounted() {
    console.log("mounted-CommodityList");
  },
};
</script>
<style lang="less" scoped>
// .slide-enter,
// .slide-leave-to {
//   right: -100%;
// }
// .slide-enter-active,
// .slide-leave-active {
//   transition: right 0.15s linear;
// }
// .slide-enter-to,
// .slide-leave {
//   right: 0;
// }

</style>