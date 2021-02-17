<template>
  <div class="buyCart">
      <div class="left" @click="showPopup">预估另需配送费￥8.51</div>
      <div class="right">20元起送</div>
      <van-popup v-model="show">内容</van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 2,
        show : false,
      };
    },
    methods: {
      showPopup() {
        this.show = true;
      },
    }
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

    .van-overlay {
      height: 80%;
    }
  }
</style>
