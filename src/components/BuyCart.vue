<template>
  <div>
    <div v-if="showCartIcon" class="buyCart">
      <div class="barItem" @click="toCustomerService">
        <van-icon name="chat-o" size="1.5rem" color="#fff" />
        <span>客服</span>
      </div>
      <div class="barItem" @click="showCartPopup">
        <van-icon name="cart-o" size="1.5rem" color="#fff" />
        <span>购物车</span>
      </div>

      <div class="barItem" @click="showCartPopup">
        <van-icon name="cash-back-record" size="1.5rem" color="#fff" />
        <span>立即下单</span>
      </div>
    </div>
    <div v-if="show" @click="showCartPopup" class="cartPopup">
      <div class="cartContainer" @click.stop="stopEeventPopup">
        <div class="cartLable">
          <span>
            <span class="lable">购物车</span>
            <span class="amount">(共{{ itemsAccumulatedAmount }}件商品)</span>
          </span>
          <span class="amount" @click.stop="cleanBuyCart"
            ><van-icon name="delete" />清空购物车</span
          >
        </div>

        <div class="list">
          <van-card
            v-for="(item, index) in $store.state.cartList"
            :key="index"
            :price="item ? item.price : '0.00'"
            desc="描述信息"
            :title="item ? item.title : '商品标题'"
            :thumb="'http://localhost:8080/file/getFileById?id=' + item.headImg"
          >
            <template #footer>
              <van-stepper
                :value="item.amount"
                min="0"
                max="100"
                @plus="stepperPlus(item.id)"
                @minus="stepperMinus(item.id)"
              />
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
        <div class="totalPrice">
          总计：<span>{{ itemsAccumulatedPrice }}</span>
          <span class="freight">预计运费另算</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    seller: String,
    showCartIcon: Boolean,
  },
  data() {
    return {
      active: 2,
      show: false,
      value: 0,
    };
  },
  computed: {
    itemsAccumulatedPrice: {
      get: function () {
        let accumulatedPrice = 0;
        let array = this.$store.state.cartList;
        for (let index = 0; index < array.length; index++) {
          const item = array[index];
          if (!item) {
            continue;
          }
          accumulatedPrice += item.price * item.amount;
        }
        return accumulatedPrice;
      },
      set: function () {},
    },
    itemsAccumulatedAmount: {
      get: function () {
        let accumulatedAmount = 0;
        let array = this.$store.state.cartList;
        for (let index = 0; index < array.length; index++) {
          const item = array[index];
          if (!item) {
            continue;
          }
          accumulatedAmount += item.amount;
        }
        return accumulatedAmount;
      },
      set: function () {},
    },
  },
  methods: {
    stopEeventPopup() {
      console.log("stopEeventPopup");
    },
    stepperPlus(itemId) {
      console.log("stepperPlus value", itemId);
      let cartList = this.$store.state.cartList;
      if (this.checkIfItemExit(cartList, itemId)) {
        for (let index = 0; index < cartList.length; index++) {
          const commodity = cartList[index];
          if (commodity.id == itemId) {
            if (!commodity.amount) {
              commodity.amount = 1;
            }
            if (commodity.amount > 100) {
              Toast.fail("商品数量超过100无法再增加!");
              return;
            }
            commodity.amount++;
            this.$store.commit("setCartListItem", {
              index: index,
              item: commodity,
            });
            return;
          }
        }
      }
    },
    stepperMinus(itemId) {
      console.log("stepperMinus value", itemId);
      let cartList = this.$store.state.cartList;
      if (this.checkIfItemExit(cartList, itemId)) {
        for (let index = 0; index < cartList.length; index++) {
          const commodity = cartList[index];
          if (commodity.id == itemId) {
            if (!commodity.amount) {
              commodity.amount = 1;
            }
            commodity.amount--;
            if (commodity.amount < 1) {
              console.log("商品从购物车清除.");
              this.$store.commit("setCartListItem", { index: index });
              return;
            }
            this.$store.commit("setCartListItem", {
              index: index,
              item: commodity,
            });
            return;
          }
        }
      }
    },
    addItem(item) {
      console.log("add item", item);
      let cartList = this.$store.state.cartList;
      if (this.checkIfItemExit(cartList, item.id)) {
        for (let index = 0; index < cartList.length; index++) {
          const commodity = cartList[index];
          if (commodity.id == item.id) {
            if (!commodity.amount) {
              commodity.amount = 1;
            }
            commodity.amount++;
            this.$store.commit("setCartListItem", {
              index: index,
              item: commodity,
            });
            return;
            break;
            console.log("after return..");
          }
        }
      }
      item.amount = 1;
      this.$store.commit("cartListAddItem", item);
    },
    checkIfItemExit(array, itemId) {
      for (let index = 0; index < array.length; index++) {
        const commodity = array[index];
        if (!commodity || !commodity.id) {
          continue;
        }
        if (itemId == commodity.id) {
          return true;
        }
      }
      return false;
    },
    toCustomerService() {
      if (this.seller == this.$store.state.user.uid) {
        Toast.fail("商家不能于自己发起会话!");
      }
      this.$router.push({
        path: "/messageList?fromCommodityDisplay=true&seller=" + this.seller,
      });
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
      // console.log("show or hide popup..");
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
  height: 91%;
  z-index: 9999;

  .cartContainer {
    background-color: #fff;
    height: 60vh;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0rem;
    box-sizing: border-box;
    overflow: scroll;

    .cartLable {
      display: flex;
      justify-content: space-between;
      margin-right: 1rem;
      margin-left: 1rem;
      height: 1.5rem;
      line-height: 1.5rem;
      border-bottom: 0.2px solid rgba(0, 0, 0, 0.2);

      .lable {
        font-weight: bolder;
      }
      .amount {
        font-size: smaller;
        color: gray;
      }
    }

    .totalPrice {
      font-size: x-large;
      color: red;
      position: absolute;
      bottom: 0;
      margin-left: 1rem;

      .freight {
        color: gray;
        font-size: small;
        margin-left: 1rem;
      }
    }
  }

  .van-card__content {
    text-align: start;
  }
  .van-card__price {
    color: red;
  }
}
</style>
