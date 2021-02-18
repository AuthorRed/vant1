<template>
<div>
  <div  v-if="showCartIcon" class="buyCart">

    <div class="barItem"  @click="toCustomerService">
      <van-icon name="chat-o"  size="1.5rem" color="#fff" />
      <span>客服</span>
    </div>
    <div class="barItem"  @click="showCartPopup">
      <van-icon name="cart-o"  size="1.5rem" color="#fff" />
      <span>购物车</span>
    </div>

    <div class="barItem"  @click="showCartPopup">
      <van-icon name="cash-back-record" size="1.5rem" color="#fff"  />
      <span>立即下单</span>
    </div>

  </div>
    <div v-if="show" @click="showCartPopup" class="cartPopup">
      <div class="cartContainer" @click.stop="cleanBuyCart">
        <div class="list">
          <van-card
            v-for="item in cartList"
            :key="item.id"
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-stepper v-model="value" min="0" max="100" />
            </template>
          </van-card>
          <!-- <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-stepper v-model="value"  min="0" max="100"/>
            </template>
          </van-card> -->
        </div>
      </div>
    </div>

</div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    seller:String,
    cartList: Array,
    showCartIcon:Boolean,
  },
  data() {
    return {
      active: 2,
      show: false,
      value: 0,
    };
  },
  methods: {
    toCustomerService() {
      if(this.seller == this.$store.state.user.uid){
        Toast.fail('商家不能于自己发起会话!')
      }
      this.$router.push({
        path:'/messageList?fromCommodityDisplay=true&seller='+this.seller,
      });
    },
    addItem(item) {
      console.log("add item", item);
    },
    cleanBuyCart() {
      console.log("clean buy cart..");
    },
    showCartPopup() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
      console.log("show or hide popup..");
    },
  },
};
</script>

<style lang="less" scoped>
.buyCart {
  position: fixed;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 3rem;
  //border-radius: 1rem;


  .barItem {
    color: #fff;
    // width: 30%;
    //background-color: gold;
    text-align: center;
    //line-height: 2rem;
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.8rem;
      line-height: 2;
      color: #fff;
    }
  }

}
  .cartPopup {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 93%;
    z-index: 9999;

    .cartContainer {
      background-color: #fff;
      height: 60vh;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0rem;
    }

    .van-card__content {
      text-align: start;
    }
    .van-card__price {
      color: red;
    }
  }
</style>
