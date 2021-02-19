<template>
  <div class="popupcontainer">
    <div class="header">
      <form action="/">
        <van-search
          ref="searchInput"
          v-model="keyWord"
          show-action
          placeholder="搜索店内商品"
          @search="onSearch"
          @cancel="back"
        >
          <template #left>
            <div @click="back"><van-icon name="arrow-left" /></div>
          </template>
        </van-search>
      </form>
      <div class="logo">
        <img src="../assets/customservice.jpg" alt="" />
        <div class="right">
          <h2>红红的小超市</h2>
          <p class="van-multi-ellipsis--l2">
            公告 说明 我们会尽快接单和配送的，请你放心吧公告 说明
            我们会尽快接单和配送的，请你放心吧公告 说明
            我们会尽快接单和配送的，请你放心吧公告 说明
            我们会尽快接单和配送的，请你放心吧
          </p>
        </div>
      </div>
      <van-tabs @click="onClick">
        <van-tab v-for="item in categoryList" :key="item" :title="item">
        </van-tab>
      </van-tabs>
    </div>

    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
        >
          <div class="list">
            <a
              v-for="item in list"
              :key="item.id"
              class="listItem"
              href="javascript:void(0)"
              @click="gotoCommodity(item.id)"
            >
              <van-card
                num="1"
                :price="item.price"
                desc="描述信息"
                :title="item.title"
                :thumb="item.headImg?('http://localhost:8080/file/getFileById?id=' + item.headImg):null "
              ></van-card>

              <!-- <div class="itemBox">
                <img
                  v-if="item.attach"
                  :src="
                    'http://localhost:8080/file/getFileById?id=' +
                    item.attach.id
                  "
                />
                <div class="itemWord">
                  <h2>{{ item.commodity.title }}</h2>
                  <h3>{{ item.commodity.price }}</h3>
                  <p>{{ item.commodity.seller }}</p>
                </div>
              </div> -->
            </a>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <buy-cart ref="buyCart" :seller="seller" :showCartIcon="showCartIcon"></buy-cart>
    <!-- <div class="buyCart">
      <div class="left" @click="showPopup">预估另需配送费￥8.5</div>
      <div class="right">20元起送</div>
      <van-popup v-model="show">内容</van-popup>
    </div> -->
  </div>
</template>
<script>
import { getRequest, postRequest } from "@/api/http.js";
import BuyCart from "@/components/BuyCart.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 1,
      keyWord: "",
      user: {},
      list: [],
      loading: false,
      finished: false,
      page: 1,
      rows: 10,
      refreshing: false,
      status: 1,
      seller: "11",
      categoryList: [],

      show: false,
      amount: 0,
      showCartIcon:true,
    };
  },
  name: "CommodityList",
  components: {
    "buy-cart": BuyCart,
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    getSellerCategory() {
      getRequest("/sellerOrder/list?", {
        sellerUid: this.seller,
      }).then((res) => {
        console.log("sellerOrder/list:", res.data);
        let payload = res.data;
        this.categoryList = payload.extenal.list;
      });
    },
    onClick(name, title) {
      this.page = 1;
      this.getList(title);
      console.log(title);
    },
    back() {
      this.$router.go(-1);
    },
    onSearch() {
      Toast("onSearch");
      this.getList();
    },
    gotoCommodity(id) {
      this.$router.push("/me/commodityList/commodityDisplay/" + id);
    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.finished = false;
      this.page = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getList(category) {
      if (!this.$store.state.user || !this.$store.state.user.uid) {
        console.log("getList");
        this.loading = false;
        Toast.fail("请先登录！");
        return;
      }
      this.loading = true;
      if (this.page == 1) {
        this.list = [];
      }
      getRequest("/commodity/list?", {
        page: this.page,
        rows: this.rows,
        status: this.status,
        seller: this.$store.state.user.uid,
        category: category,
      }).then((res) => {
        // console.log('commodity/list:',res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.list) {
          if (payload.extenal.list.length < 1) {
            this.finished = true;
          } else {
            this.page++;
            // this.list = this.list.concat(payload.extenal.list);
            for (let i = 0; i < payload.extenal.list.length; i++) {
              this.list.push(payload.extenal.list[i]);
            }
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
      this.getList();
    },
  },
  mounted() {
    this.getSellerCategory();
  },
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


.popupcontainer {
  width: 100%;
  background: rgb(243, 243, 243);
  position: absolute;
  top: 0;
  z-index: 99;

  .header {
    position: sticky;
    top: 0;


    .logo {
      display: flex;
      background-color: #fff;
      .right {
        margin-top: 0.3rem;
      }
      h2 {
        text-align: start;
        color: black;
      }
      p {
        text-align: start;
        margin-block-start: 0em;
        margin-block-end: 0em;
        font-size: small;
        color: gray;
        padding-top: 0.3rem;
      }
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 0.2rem;
        margin: 0.3rem;
      }
    }
    /* .categoryWarper {
      position: absolute;
      bottom: -2vh;
      .category {
        width: 80%;
        box-sizing: border-box;
        overflow: scroll;
        height: 5vh;
        background-color: rgb(243, 243, 243);
        white-space: nowrap;
        .item {
          padding-right: 1.3rem;
        }
      }
    } */
  }
  .content {
    width: 100%;
    position: absolute;
      
    .list {
      .listItem {
        display: flex;
        position: relative;
        width: 100%;

        .van-card {
          width: 100%;
        }
        .van-card__content {
          text-align: start;
        }
        .van-card__price {
          color: red;
        }
        .itemBox {
          display: flex;
          img {
            width: 7rem;
            height: 7rem;
            border-radius: 0.5rem;
          }
          .itemWord {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
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
            p {
              margin: 0.3rem;
              display: inherit;
              color: #9a9a9a;
              font-weight: normal;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }

  // .buyCart {
  //   position: fixed;
  //   bottom: 0.5rem;
  //   background-color: rgba(0, 0, 0, 0.7);
  //   width: 100%;
  //   display: flex;
  //   justify-content: center;
  //   height: 2rem;
  //   border-radius: 1rem;

  //   .left {
  //     color: #fff;
  //     width: 70%;
  //   }
  //   .right {
  //     color: darkblue;
  //     width: 30%;
  //     background-color: gold;
  //     text-align: center;
  //     line-height: 2rem;
  //     border-top-right-radius: 1rem;
  //     border-bottom-right-radius: 1rem;
  //   }

  //   .van-overlay {
  //     height: 80%;
  //   }
  // }
}
</style>