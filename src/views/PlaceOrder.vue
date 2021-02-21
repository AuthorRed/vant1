<template>
  <div class="container">
    <van-nav-bar
      title="下单"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="back()"
    />
    <div class="content">
      <div class="block">
        <div class="address">
          <h3><span>飞飞</span><span>18888888888</span></h3>
          <p>上海上海市浦东新区三林镇凌兆路XXX弄XXX小区的XXX苑XX号楼XX室</p>
        </div>
      </div>
      <div class="block">
        <div class="shopLable">红红的小商店</div>
        <div class="list">
          <van-card
            v-for="(item, index) in $store.state.cartList"
            :num="item.amount"
            :key="index"
            :price="item ? item.price : '0.00'"
            desc="描述信息"
            :title="item ? item.title : '商品标题'"
            :thumb="'http://localhost:8080/file/getFileById?id=' + item.headImg"
          ></van-card>
        </div>
        <div class="freightInfo">运费：￥ 6</div>
        <div class="totalPrice">订单共{{ itemsAccumulatedAmount }}件商品</div>
        <div class="totalPrice">
          小计&nbsp;￥&nbsp;<span>{{ itemsAccumulatedPrice }}</span>
        </div>
      </div>
      <div class="block">
        <input type="text" v-model="remark">
      </div>

    </div>
    <div class="submitOrder">
      <div class="innerBox">
        <div class="left">&nbsp;￥&nbsp;{{ itemsAccumulatedPrice }}</div>
        <div class="right" @click="submitOrder">提交订单</div>
      </div>
    </div>
  </div>
</template>
<script>
import { postRequest,postJson } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      uid: "",
      pwd: "",
      remark:"",
    };
  },
  name: "PlaceOrder",
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
    submitOrder(values) {
      let user = this.$store.state.user;
      const list = this.$store.state.cartList;
      let orderDetailList =[];
      for(let i=0;i<list.length;i++){
        let orderDetail = {};
        orderDetail.commodityId = list[i].id;
        orderDetail.num = list[i].amount;
        orderDetail.remark = list[i].remark;
        orderDetail.commodityDesc = list[i].commodityDesc;  
        orderDetailList.push(orderDetail);
      }
      let order = {};
      order.amount = this.itemsAccumulatedAmount;
      order.list = orderDetailList;
      order.token = user.token;
      order.sellerUid = list[0].seller
      order.buyerUid = user.uid;
      order.remark = this.remark;
      order.buyerPay = this.itemsAccumulatedPrice;

      console.log("order", order);
      postJson("/order/save", order).then((res) => {
        console.log("res.data", res.data);
        if (200 == res.data.code) {
          this.$store.commit('setCartList',[]);
          Toast.success("下单成功！");
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },

    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    console.log("mounted-LoginForm");
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

  .van-nav-bar {
    position: fixed;
    width: 100%;
  }

  .submitOrder {
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 3rem;

    .innerBox {
      display: flex;
      background-color: rgba(0, 0, 0, 0.8);
      height: 100%;
      color: #fff;
      margin-left: 1rem;
      margin-right: 1rem;
      border-radius: 2rem;
      box-sizing: border-box;
      overflow: hidden;

      .left {
        width: 50%;
        line-height: 3rem;
      }
      .right {
        width: 50%;
        line-height: 3rem;
        background-color: red;
      }
    }
  }

  .content {
    position: absolute;
    top: 46px;
    width: 100%;
    padding-bottom: 5rem;
  }
  .address {
    text-align: left;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: small;
    line-height: 2rem;
  }
  .block {
    background-color: #fff;
    border-radius: 0.5rem;
    margin: 0.5rem;

    .freightInfo {
      border-top: 0.5px solid rgba(0, 0, 0, 0.2);
      margin-left: 1rem;
      margin-right: 1rem;
      height: 2rem;
      line-height: 2rem;
      font-size: small;
      text-align: left;
    }
    .shopLable {
      height: 2rem;
      line-height: 2rem;
      text-align: left;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
      font-size: small;
      margin-right: 1rem;
      margin-left: 1rem;
      color: grey;
    }

    .list {
      //border-bottom: .5px solid rgba(0,0,0,.1);
    }
  }
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
    font-size: small;
    //border-top: 0.5px solid rgba(0, 0, 0, 0.2);
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: right;
    height: 3rem;
    line-height: 3rem;
    color: gray;

    span {
      color: red;
      font-size: x-large;
    }

    .freight {
      color: gray;
      font-size: small;
      margin-left: 1rem;
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