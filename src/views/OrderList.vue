<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="订单" left-text="返回" left-arrow @click-left="back()"/>
      <van-tabs @click="chooseOrderType">
        <van-tab name="buyer" title="我发出的订单"></van-tab>
        <van-tab name="seller" title="我收到的订单"></van-tab>
      </van-tabs>
      <van-tabs @click="chooseOrderStatus" sticky>
        <van-tab name="100" title="全部"></van-tab>
        <van-tab name="10" title="待接单" :dot="dot10"></van-tab>
        <van-tab name="20" title="待付款" :dot="dot20" ></van-tab>
        <van-tab name="30" title="待收款" :dot="dot30" ></van-tab>
        <van-tab name="40" title="待发货" :dot="dot40" ></van-tab>
        <van-tab name="50" title="待收货" :dot="dot50" ></van-tab>
        <van-tab name="60" title="完成" :dot="dot60" ></van-tab>
        <van-tab name="70" title="问题单" :dot="dot70" ></van-tab>
      </van-tabs>
    </div>

    <div v-if="$route.path == '/me/orderList'" class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <div class="list">
          <a  v-for="(item) in list" :key="item.id" 
            class="listItem"
            href="javascript:void(0)"
            @click="gotoCommodity(item.id)"
          >
          <van-swipe-cell>
            <div class="block">
              <h2><span>订单号：</span> {{item.id}}</h2>
              <h2><span>卖家：</span> {{item.sellerUid}}</h2>
              <h2><span>买家：</span> {{item.buyerUid}}</h2>
              <h2><span>状态：</span> {{item.status|formatStatus}}</h2>
              <h2><span>数量：</span> {{item.amount}}</h2>
              <h2><span>金额：</span> {{item.buyerPay}}</h2>
              <h2><span>备注：</span> {{item.remark}}</h2>
              <h2><span>下单时间：</span> {{item.addTime |formatDate}}</h2>
              <h2><span>更新时间：</span> {{item.updateTime|formatDate}}</h2>
            </div>
            <template #right>
              <van-button square type="primary" text="确认" @click="orderConfirm(item.id,item.status)"/>
              <van-button square type="danger" text="拒绝为问题单"  @click="orderReject(item.id,item.status)"/>
            </template>
          </van-swipe-cell>
            
          </a>
        </div>
      
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getRequest,postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      keyWord: "",
      user: {},
      list: [],
      loading: false,
      finished: false,
      page: 1,
      rows: 5,
      refreshing: false,
      status: null,
      orderType:'buyer',
      dot10:false,
      dot20:false,
      dot30:false,
      dot40:false,
      dot50:false,
      dot60:false,
      dot70:false,

    };
  },
  name: "OrderList",
  methods: {
    orderConfirm(id,status){
      let newStatus = null;
      if(!status){
        return;
      }
      if(status ==10){
        newStatus = 20;
      }else if(status ==20){
        newStatus = 30;
      }else if(status ==30){
        newStatus = 40;
      }else if(status ==40){
        newStatus = 50;
      }else if(status ==50){
        newStatus = 60;
      }else {
        return;
      }
      this.updateOrderStatus(id,newStatus,status);
    },
    orderReject(id,status){
      if(!status){
        return;
      }
      this.updateOrderStatus(id,70,status);
    },
    updateOrderStatus(id,status,oldStatus){
      console.log("status", status);
      var fd = new FormData();
      fd.token = this.$store.state.user.token;
      fd.id = id;
      fd.status = status;
      console.log("fd", fd);
      postRequest("/order/update", fd).then((res) => {
        console.log("res.data", res.data);
        if (200 == res.data.code) {
          for(let i = 0;i<this.list.length;i++){
            if(id == this.list[i].id ){
              this.list.splice(i,1);
              break;
            }
          }
          this.lightenDot(status);
          this.clearOldDot(oldStatus);
          Toast.success("更新成功！");
        } else {
          Toast.fail("更新失败:" + res.data.msg);
        }
      });
    },
    clearOldDot(status){
      if(!status){
        return;
      }
      if(this.list.length<1){
        if(status ==10){
          this.dot10 = false;
        }else if(status ==20){
          this.dot20 = false;
        }else if(status ==30){
          this.dot30 = false;
        }else if(status ==40){
          this.dot40 = false;
        }else if(status ==50){
          this.dot50 = false;
        }else if(status ==60){
          this.dot60 = false;
        }else if(status ==70){
          this.dot70 = false;
        }
      }
    },
    lightenDot(status){
      if(!status){
        return;
      }
      if(status ==10){
        this.dot10 = true;
      }else if(status ==20){
        this.dot20 = true;
      }else if(status ==30){
        this.dot30 = true;
      }else if(status ==40){
        this.dot40 = true;
      }else if(status ==50){
        this.dot50 = true;
      }else if(status ==60){
        this.dot60 = true;
      }else if(status ==70){
        this.dot70 = true;
      }
    },
    chooseOrderStatus(name, title){
      console.log(name);
      
      if(this.status==name){
        return;
      }else{
        this.status =name;  
        this.page =1;
        this.list = [];
        this.getList();
      }
    },
    chooseOrderType(name, title){
      console.log(name);
      if(this.orderType==name){
        return;
      }else{
        this.orderType =name;  
        this.page =1;
        this.list = [];
        this.getList();
      }
    },
    back() {
      this.$router.go(-1);
    },
    gotoCommodity(id) {
      this.$router.push("/me/commodityList/commodityDisplay/" + id);
    },
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

    onRefresh() {
      // 清空列表数据
      // let array = this.list;
      // for (let i = 0;i<array.length;i++) {
      //   console.log(array.pop());  
      // }
      this.list =[];

      this.finished = false;
      this.page = 1;
      // 重新加载数据
      // this.getList();
    },
    getList() {
      let params={};
      params.token = this.$store.state.user.token;
      params.orderType = this.orderType;
      params.page = this.page;
      params.rows = this.rows;
      params.status = this.status ==100?null:this.status;
      getRequest("/order/list?",params).then((res) => {
        console.log('order/list:',res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.list) {
          if (payload.extenal.list.length < 1 || payload.extenal.list.length <this.rows) {
            this.finished = true;
          } else {
            this.page++;
          }
          for (let i = 0; i < payload.extenal.list.length; i++) {
            this.list.push(payload.extenal.list[i]);
          }
        } else {
          this.finished = true;
        }

        this.loading = false;
        this.refreshing = false;
      });
    },
    commodityAdd() {
      this.$router.push("/me/commodityList/commodityAdd");
    },
    onLoad() {
      //this.getList();
    },
  },
  mounted() {
    
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
    formatStatus: function (value) {
      if (!value) {
        return "";
      }
      if(value ==10){
        return "待商家接单";
      }
      if(value ==20){
        return "待买家付款";
      }
      if(value ==30){
        return "待商家确认收款";
      }
      if(value ==40){
        return "待商家发货";
      }
      if(value ==50){
        return "待买家确认收货";
      }
      if(value ==60){
        return "完成";
      }
      if(value ==70){
        return "问题单";
      }
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

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;
  }
  .content {
    position: absolute;
    top: 138px;
    width: 100%;

    .van-card {
      width: 100%;
      .van-card__content {
        text-align: left;
      }
      .van-card__price {
        color: red;
      }
    }
  }
}

  .block {
    background-color: #fff;
    width: 100%;
    margin: 5px;
    text-align: left;
  }
 .list {
  .listItem {
    display:flex;
    position: relative;
    width: 100%;
    .itemBox {
      display: flex;
      img {
        width: 7rem;
        height: 7rem;
        border-radius: .5rem;
      }
      .itemWord {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        h2 {
          margin: .3rem;
          display: inherit;
          color: #383838;
          font-weight: normal;
          font-size: 0.9rem;
        }
        h3 {
          margin: .3rem;
          display: inherit;
          color: #fc4a3c;
          font-weight: normal;
        }
        p {
          margin: .3rem;
          display: inherit;
          color: #9a9a9a;
          font-weight: normal;
          font-size: 0.8rem;
        }
      }
    }
  }
} 
.van-swipe-cell {
  width:100%;

  .van-button--square{
     height: 100%;
  }
}
</style>