<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        title="评论"
        left-text="返回"
        left-arrow
        @click-left="back()"
      />
    </div>

    <div class="content">
      <div class="commentBlock">
        <!-- <div class="commentHeader">
          <span>评价</span>
          <span class="checkAllComment" @click="gotoCommentList()"
            >查看全部&nbsp;&nbsp;&nbsp;&nbsp;<van-icon name="arrow"
          /></span>
        </div> -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
        >
          <!-- <div class="commentItem">
            <div class="commentUser">
              <img src="../assets/logo.png" alt="" /> xiaofeifei
            </div>
            <p>
              整体评价：非常好啊！！！我好喜欢哟哦，大家快来买哟！整体评价：非常好啊！！
              ！我好喜欢哟哦，大家快来买哟！整体评价：非常好啊！！！我好喜欢哟哦，大家快来买哟！
              整体评价：非常好啊！！！我好喜欢哟哦，大家快来买哟！
            </p>
          </div> -->
          <div
            v-for="(item, index) in commentVO"
            :key="index"
            class="commentItem"
          >
            <div class="commentUser">
              <img src="../assets/logo.png" alt="" /> {{ item.comment.uid }}
            </div>
            <p>{{ item.comment.text }}</p>
            <p class="commentImg" style="display: flex">
              <img
                v-for="(attach, index) in item.attaches"
                :key="index"
                :src="'http://localhost:8080/file/getFileById?id=' + attach.id"
              />
            </p>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/api/http.js";

export default {
  data() {
    return {
      commentVO: [],
      loading: false,
      finished: false,
      page: 1,
      rows: 3,
      commodityId: 0,
      rate: 5,
    };
  },
  name: "CommentList",
  methods: {
    back() {
      this.$router.go(-1);
    },
    gotoOrderDetail(id) {
      this.$router.push("/me/OrderDetail/" + id);
    },
    getList() {
      this.loading = true;
      let params = {};
      params.token = this.$store.state.user.token;
      params.commodityId = this.commodityId;
      params.page = this.page;
      params.rows = this.rows;
      getRequest("/comment/listByCommodityId?", params).then((res) => {
        console.log("comment/listByCommodityId?:", res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.commentVO) {
          if (
            payload.extenal.commentVO.length < 1 ||
            payload.extenal.commentVO.length < this.rows
          ) {
            this.finished = true;
          } else {
            this.page++;
            this.finished = false;
          }
          for (let i = 0; i < payload.extenal.commentVO.length; i++) {
            this.commentVO.push(payload.extenal.commentVO[i]);
          }
        } else {
          this.finished = true;
        }

        this.loading = false;
      });
    },
    onLoad() {
      //this.getList();
    },
  },
  mounted() {
    this.commodityId = this.$route.query.commodityId;
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

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;
  }
  .content {
    position: absolute;
    top: 40px;
    width: 100%;
  }
}

.commentBlock {
  background-color: #fff;
  padding-bottom: 0.5rem;

  .commentHeader {
    display: flex;
    justify-content: space-between;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: black;
    line-height: 2rem;

    .checkAllComment {
      display: flex;
      align-items: center;
    }
  }
  .commentItem {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.5rem;
    .commentUser {
      text-align: left;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .commentImg {
      display: flex;
      flex-wrap: wrap;

      img {
        width: 6rem;
        height: 6rem;
        margin: 0.2rem;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 0.2rem;
    }
    p {
      text-align: left;
      font-size: small;
      line-height: 1rem;
    }
  }
}
</style>