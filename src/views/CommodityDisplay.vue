<template>
  <div class="container">
    <div v-if="$route.path.indexOf('/messageItem') < 0" class="content">
      <van-nav-bar
        title="添加商品"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(id, index) in imgList" :key="index">
          <img
            :src="'http://localhost:8080/file/getFileById?id=' + id"
            width="100%"
            height="200px"
            style="display: block"
          />
        </van-swipe-item>
      </van-swipe>
      <h2>{{ commodity.title }}</h2>
      <h3>￥:{{ commodity.price }}</h3>
      <h2>{{ commodity.seller }}</h2>
    
      <buy-cart ref="buyCart" :seller="commodity.seller" :showCartIcon="showCartIcon"></buy-cart>
      <van-goods-action>
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          @click="toCustomerService"
        />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="showCartPopup" />
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          @click="toSellerShop"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="toPlaceOrder"
        />
      </van-goods-action>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <!-- <buy-cart></buy-cart> -->
  </div>
</template>
<script>
import { getRequest, postRequest, postFile } from "@/api/http.js";
import BuyCart from "@/components/BuyCart.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      searchValue: "",
      imgList: [],
      commodityId: 0,
      commodity: {},
      showCartIcon:false,
    };
  },
  name: "CommodityDisplay",
  components: {
    "buy-cart": BuyCart,
  },
  methods: {
    showCartPopup(){
      this.$refs.buyCart.showCartPopup();
      console.log("showCartPopup:",this.$refs.buyCart);
    },
    /* toCustomerService() {
      this.$router.push(
        "/me/commodityList/commodityDisplay/" +
          this.$route.params.id +
          "/messageItem"
      );
    }, */
    toCustomerService() {
      console.log("this.seller:", this.commodity.seller);
      if(this.commodity.seller == this.$store.state.user.uid){
        Toast.fail('商家不能于自己发起会话!')
      }
      this.$router.push({
        path:'/messageList?fromCommodityDisplay=true&seller='+this.commodity.seller,
      });
    },
    toSellerShop() {
      console.log("toSellerShop");
    },
    toPlaceOrder() {
      console.log("toPlaceOrder");
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
      }
    },
    getCommodity() {
      this.loading = true;
      getRequest("/a/" + this.commodityId).then((res) => {
        console.log("commodity:", res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.attaches) {
          this.commodity = payload.extenal.commodity;
          for (let i = 0; i < payload.extenal.attaches.length; i++) {
            this.imgList.push(payload.extenal.attaches[i].id);
            // console.log('imgList',this.imgList[i]);
          }
        }
      });
    },
    back() {
      // this.$router.push("/me/commodityList");
      this.$router.go(-1);
    },
  },
  mounted() {
    this.commodityId = this.$route.params.id;
    console.log("mounted-CommodityDisplay", this.commodityId);
    this.getCommodity();
    this.getUser();
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

h2 {
  margin: 0.3rem;
  display: inherit;
  color: #383838;
  font-weight: normal;
  font-size: 0.9rem;
}
h3 {
  margin: 0.3rem;
  display: inherit;
  color: #fc4a3c;
  font-weight: normal;
}
</style>