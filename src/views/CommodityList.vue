<template>
  <div class="container">
    <div v-if="$route.path == '/me/commodityList'" class="content">
      <van-nav-bar
        title="商品"
        left-text="返回"
        right-text="添加商品"
        left-arrow
        @click-left="back()"
        @click-right="commodityAdd"
      />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <div class="list">
          <a  v-for="(item) in list" :key="item.commodity.id" 
            class="listItem"
            href="javascript:void(0)"
            @click="gotoCommodity(item.commodity.id)"
          >
            <div class="itemBox">
              <img v-if="item.attach"
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
            </div>
          </a>
        </div>
      
      </van-list>
      </van-pull-refresh>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getRequest,postRequest } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      page:1,
      rows:10,
      refreshing: false,
      status: 1,
    };
  },
  name: "CommodityList",

  methods: {
    back() {
      this.$router.push("/me");
    },
    gotoCommodity(id) {
      this.$router.push("/me/commodityList/commodityDisplay/"+id);
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
      this.list=[];
      this.finished = false;
      this.page =1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getList() {
      this.loading=true;
      getRequest("/commodity/list?", {
        page: this.page,
        rows: this.rows,
        status: this.status,
        seller: this.user.uid,
      }).then((res) => {
        // console.log('commodity/list:',res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.list) {
          if(payload.extenal.list.length<1){
            this.finished=true;
          }else{
            this.page++;
            // this.list = this.list.concat(payload.extenal.list);
            for(let i=0;i<payload.extenal.list.length;i++){
              this.list.push(payload.extenal.list[i]);
            }
            
          }
          
        } else {
          this.finished=true;
        }

        this.loading=false;
        this.refreshing=false;
      });
    },
    commodityAdd() {
      this.$router.push("/me/commodityList/commodityAdd");
    },
    onLoad() {
      this.getList();
    }
  },
  mounted() {
    this.getUser();
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

.container {
  width: 100%;
  background: rgb(243, 243, 243);
  position: absolute;
  top: 0;
  z-index: 99;
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