<template>
  <div class="container">
    <div class="header">
      <form action="/">
        <van-search
          ref="searchInput"
          v-model="keyWord"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="back"
        >
          <template #left>
            <div @click="back"><van-icon name="arrow-left" /></div>
          </template>
        </van-search>
      </form>
    </div>

    <div v-if="$route.path == '/searchList'" class="content">
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
            <van-card
              num="1"
              :price="item.price"
              desc="描述信息"
              :title="item.title"
              :thumb="item.img_id?('http://localhost:8080/file/getFileById?id=' + item.img_id):null "
            ></van-card>
          </a>
        </div>
      
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";
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
      rows: 8,
      refreshing: false,
      status: 1,
    };
  },
  name: "OrderList",
  methods: {
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
      if(!this.keyWord ||this.finished){
        this.loading = false;
        this.finished = true;
        this.refreshing = false;
        console.log('keyWord == null');
        return;
      }
      // 清空列表数据
      this.list = [];
      this.finished = false;
      this.page = 1;
      // 重新加载数据
      this.getList();
    },
    getList() {
      if(!this.keyWord ){
        this.loading = false;
        // this.finished = true;
        this.refreshing = false;
        console.log('keyWord == null');
        return;
      }
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      // this.list = [];
      getRequest("/search/index?keyWord="+this.keyWord, {
        page: this.page,
        rows: this.rows,
        // status: this.status,
        // seller: this.user.uid,
      }).then((res) => {
        console.log('commodity/list:',res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.list) {
          if (payload.extenal.list.length < 1 || payload.extenal.list.length <this.rows) {
            this.finished = true;
          } else {
            this.page++;
            // this.list = this.list.concat(payload.extenal.list);
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
    //this.getUser();
    //this.getList();
    console.log("mounted-SearchList");
    console.log(this);
    this.$refs.searchInput.focus();
  },
  watch:{
    keyWord: function (a, b) {
      this.page = 1;
      this.list = [];
    }
  }
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
    top: 54px;
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