<template>
  <div class="container">
    <van-nav-bar title="添加商品" left-text="返回" right-text="添加商品" left-arrow @click-left="back()"  @click-right="commodityAdd"/>
aa
    
  </div>
</template>
<script>
import { postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  name: "CommodityAdd",

  methods: {
    back() {
      this.$router.push("/me");
    },
    commodityAdd(){
      console.log('aa');
    },
    

  },
  mounted() {
    console.log("mounted-CommodityList");
  },
};
</script>
<style lang="less" scoped>
.slide-enter, .slide-leave-to{
  right: -100%;
}
.slide-enter-active, .slide-leave-active{
  transition: right .15s linear;
}
.slide-enter-to, .slide-leave{
  right: 0;
}
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
</style>