<template>
  <div class="container">
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
  </div>
</template>
<script>
import { getRequest, postRequest, postFile } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      searchValue: "",
      imgList: [],
      commodityId: 0,
      commodity: {},
    };
  },
  name: "CommodityDisplay",

  methods: {
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
      this.$router.push("/me/commodityList");
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