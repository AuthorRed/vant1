<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
    </div>

    <div  class="content">
     
          <div class="list">
            <a
              v-for="item in list"
              :key="item.id"
              class="listItem"
              href="javascript:void(0)"
              
            >
                <div class="block">
                  <h2><span>订单号：</span> {{ item.id }}</h2>
                 <!-- <h2><span>商品ID：</span> {{ item.commodityId }}</h2>
                  <h2><span>备注：</span> {{ item.remark }}</h2> -->
                  <van-card
                    :num="item.num"
                    :price="'实付:'+item.buyerPay"
                    desc="描述信息"
                    :title="item.title"
                    :thumb="item.headImg?('http://localhost:8080/file/getFileById?id=' + item.headImg):null "
                  >
                  <template #footer>
                    <van-button plain  size="small" @click="toCommentAdd(item.commodityId)">评价晒单</van-button>
                    <van-button plain  size="small" @click="gotoCommodity(item.commodityId)">查看商品</van-button>
                  </template></van-card>
                </div>
            </a>
          </div>
    </div>
  </div>
</template>
<script>
import { getRequest, postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      orderId: 0,
      list: [],
    };
  },
  name: "OrderDetail",
  methods: {
    gotoCommodity(id){
      this.$router.push("/me/commodityList/commodityDisplay/" + id);
    },
    toCommentAdd(id){
      console.log('commodityId',id);
      this.$router.push('/me/commentAdd?commodityId=' + id);
    },
    back() {
      this.$router.go(-1);
    },
    getList() {
      if (this.orderId==0) {
        return;
      }
      this.loading = true;
      let params = {};
      params.token = this.$store.state.user.token;
      params.id = this.orderId;
      getRequest("/order/getOrderDetailByOrderId?", params).then((res) => {
        console.log("order/list:", res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.list) {
          for (let i = 0; i < payload.extenal.list.length; i++) {
            this.list.push(payload.extenal.list[i]);
          }
        } 
      });
    },
    onLoad() {
      //this.getList();
    },
  },
  mounted() {
    this.orderId = this.$route.params.id;
    console.log('orderId',this.orderId);
    this.getList();
  },
  filters: {
    formatDate: function (value) {
      if (!value) {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  background: rgb(243, 243, 243);
  position: absolute;
  top: 0;
  z-index: 99;
}
.block {
  background-color: #fff;
  width: 100%;
  margin: 5px;
  text-align: left;
}
</style>