<template>
  <div class="buyCart">
    <div class="left" @click="showCartPopup">预估另需配送费￥8.51</div>
    <div class="right">20元起送</div>

    <div v-if="show" @click="showCartPopup" class="cartPopup">
      <div class="cartContainer" @click.stop="cleanBuyCart">
        <div class="list">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-stepper v-model="value"  min="0" max="100"/>
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      show: false,
      value:0,
      
    };
  },
  methods: {
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
  bottom: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  display: flex;
  justify-content: center;
  height: 2rem;
  border-radius: 1rem;

  .left {
    color: #fff;
    width: 70%;
    line-height: 2rem;
  }
  .right {
    color: darkblue;
    width: 30%;
    background-color: gold;
    text-align: center;
    line-height: 2rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
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
      color:red;
    }

  }
}
</style>
