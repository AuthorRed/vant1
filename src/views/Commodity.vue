<template>
  <div class="home">
    <van-search v-model="searchValue" disabled placeholder="请输入搜索关键词" @click="toSearch()" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item><img src="https://img.yzcdn.cn/vant/apple-1.jpg" width="100%" height="200px" style="display:block"></van-swipe-item>
      <van-swipe-item v-for="(image, index) in imgList" :key="index" >
        <img src="https://img.yzcdn.cn/vant/apple-1.jpg"   width="100%" height="200px" style="display:block"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: 'Commodity',
  data() {
    return {
      searchValue: '',
      imgList: [1,2,3]
    }
  },

  methods: {
    toSearch() {
      console.log('tosearch la...');
      this.$router.push('/Home/MyPopup');
    }
  }
}
</script>

<style type='less' scoped>
.popup {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background:#efefef;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>