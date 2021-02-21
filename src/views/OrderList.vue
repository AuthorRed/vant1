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
        <van-tab name="10" title="待确认"></van-tab>
        <van-tab name="20" title="待付款"></van-tab>
        <van-tab name="30" title="待收货"></van-tab>
        <van-tab name="40" title="已完成"></van-tab>
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
          <div class="block">
            <h2><span>订单号：</span> {{item.id}}</h2>
            <h2><span>卖家：</span> {{item.sellerUid}}</h2>
            <h2><span>买家：</span> {{item.buyerUid}}</h2>
            <h2><span>状态：</span> {{item.status}}</h2>
            <h2><span>数量：</span> {{item.amount}}</h2>
            <h2><span>备注：</span> {{item.remark}}</h2>
          </div>
            <!-- <van-card
              :num="item.sellerUid"
              :price="item.status"
              desc="订单信息"
              :title="item.buyerUid"
              :thumb="item.img_id?('http://localhost:8080/file/getFileById?id=' + item.img_id):null "
            ></van-card> -->
          </a>
        </div>
      
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";
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
    };
  },
  name: "OrderList",
  methods: {
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
      let array = this.list;
      for (let i = 0;i<array.length;i++) {
        console.log(array.pop());  
      }

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
</style>