<template>
  <div class="container">
    <div v-if="$route.path == '/messageList'" class="content">
      <van-nav-bar
        title="消息"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
      <div class="list">
        <a
          v-for="item in list"
          :key="item.id"
          class="listItem"
          href="javascript:void(0)"
        >
          <div class="itemBox">
            <img
              v-if="item.img_id"
              :src="'http://localhost:8080/file/getFileById?id=' + item.img_id"
            />
            <img v-if="!item.img_id" src="/assets/logo.png" />
            <div class="itemWord">
              <h2>{{ item.title }}</h2>
              <h3>{{ item.price }}</h3>
              <p>{{ item.seller }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";
export default {
  data() {
    return {
      user: {},
      list: [],
    };
  },
  name: "SearchList",
  methods: {
    back() {
      this.$router.go(-1);
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
  },
  mounted() {
    this.getUser();
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

.list {
  .listItem {
    display: flex;
    position: relative;
    width: 100%;
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
</style>