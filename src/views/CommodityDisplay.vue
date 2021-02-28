<template>
  <div class="container">
    <div v-if="$route.path.indexOf('/messageItem') < 0" class="content">
      <div class="navBar">
        <div class="iconWraper" @click="back">
          <van-icon  color="#fff" name="arrow-left" size="20"/>
        </div>
        <div class="iconWraper" style="display:none">
          <van-icon  color="#fff" name="weapp-nav" size="20"/>
        </div>
      </div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(id, index) in swipeList" :key="index">
          <img
            :src="'http://localhost:8080/file/getFileById?id=' + id"
            width="100%"
            height="500px"
            style="display: block"
          />
        </van-swipe-item>
      </van-swipe>
      <h2>{{ commodity.title }}</h2>
      <h3>￥:{{ commodity.price }}</h3>
      <h2>{{ commodity.seller }}</h2>

      <div class="commentBlock"> 
        <div class="commentHeader">
          <span>评价</span>
          <span class="checkAllComment" @click="gotoCommentList()">查看全部&nbsp;&nbsp;&nbsp;&nbsp;<van-icon name="arrow" /></span>
        </div>
        <div v-for="(item, index) in commentVO" :key="index" class="commentItem">
          <div class="commentUser"><img src="../assets/logo.png" alt=""> {{item.comment.uid}}</div>
          <p>{{item.comment.text}}</p>
          <p class="commentImg" style="display: flex">
            <img v-for="(attach, index) in item.attaches" :key="index"
              :src="'http://localhost:8080/file/getFileById?id=' + attach.id"
            />
          </p>
        </div>
      </div>

      <div class="detailImg">
        <img v-for="(id, index) in detailList" :key="index" :src="'http://localhost:8080/file/getFileById?id=' + id" alt="图片">
      </div>
    
      <buy-cart ref="buyCart" :seller="commodity.seller" :showCartIcon="showCartIcon" ></buy-cart>
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
        <van-goods-action-button type="warning" text="加入购物车"  @click="add2buyCart"/>
        <van-goods-action-button type="danger" text="立即购买" @click="toPlaceOrder"/>
      </van-goods-action>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
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
      swipeList: [],
      detailList: [],
      commodityId: 0,
      commodity: {},
      showCartIcon:false,
      commentVO:[],
    };
  },
  name: "CommodityDisplay",
  components: {
    "buy-cart": BuyCart,
  },
  methods: {
    gotoCommentList(){
      this.$router.push('/me/commodityList/commentList?commodityId='+this.commodityId);
    },
    add2buyCart(){
      this.$refs.buyCart.addItem(this.commodity);
    },
    showCartPopup(){
      this.$refs.buyCart.showCartPopup();
    },
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
      this.$router.push('/me/placeOrder');
    },
    getCommodity() {
      this.loading = true;
      getRequest("/commodity/getCommodity/" + this.commodityId).then((res) => {
        console.log("commodity:", res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.attaches) {
          this.commodity = payload.extenal.commodity;
          for (let i = 0; i < payload.extenal.attaches.length; i++) {
            if(payload.extenal.attaches[i].type==20){
              this.swipeList.push(payload.extenal.attaches[i].id);
            }else if(payload.extenal.attaches[i].type==30){
              this.detailList.push(payload.extenal.attaches[i].id);
            }
          }

          this.commentVO = payload.extenal.commentVO;
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

.detailImg {
  img{
      width: 100vw;
  }
}
.navBar {
  top: 1rem;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: 2rem;
  background-color: rgba(0,0,0,0);
  z-index: 99;

  .iconWraper {
    background-color: rgba(0,0,0,.6);
    border-radius: 2rem;
    height: 2rem;
    width: 2rem;
    line-height: 2.5rem;
    margin-left: 1rem;
  }
}

.commentBlock {
  background-color: #fff;
  padding-bottom: .5rem;

  .commentHeader {
    display: flex;
    justify-content: space-between;
    margin-left: .5rem;
    margin-right: .5rem;
    color: black;
    line-height: 2rem;
    
    .checkAllComment {
      display: flex;
      align-items: center;
    }
  }
  .commentItem {
    margin-left: .5rem;
    margin-right: .5rem;
    border-bottom: .5px solid rgba(0,0,0,.2);
    padding-bottom: .5rem;
    .commentUser {
      text-align: left;
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
    .commentImg{
      display: flex;
      flex-wrap: wrap;
      img {
        width: 6rem;
        height: 6rem;
        margin:.2rem;
      }
    }
    img {
        width: 1rem;
        height: 1rem;
        border-radius: 0.2rem;
      }
    p {
      text-align: left;
      font-size: small;
      line-height: 1rem;
    }
  }
}
</style>