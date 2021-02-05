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
import { getRequest,postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      page:1,
      rows:10,
    };
  },
  name: "CommodityList",

  methods: {
    back() {
      this.$router.push("/me");
    },
    getUser() {
      let user = {};
      const cacheUser = sessionStorage.getItem("user");
      if (cacheUser) {
        try {
          user = JSON.parse(cacheUser);
        } catch (error) {
          console.log(error);
        }
        this.user = user;
        this.seller = user.uid;
      }
    },
    commodityAdd() {
      this.$router.push("/me/commodityList/commodityAdd");
    },
    onLoad() {
      console.log("loading..");
    },
    getList(){
      console.log('this.user.sellerId',this.user.uid);
      getRequest("/commodity/list?",{page:this.page,rows:this.rows,seller:this.user.uid}).then((res) => {
          console.log(res.data);
          let payload = res.data;
          if (200 == payload.code && payload.extenal.list) {
            for(var item of payload.extenal.list){
                console.log(item.id);
            }
            // this.list = payload.extenal.list
          } else {
            Toast.fail("加载数据出错！");
          }
        });
    }
  },
  mounted() {
    console.log("mounted-CommodityList");
    this.getUser()
    this.getList();
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