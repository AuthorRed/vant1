<template>
  <div class="container">
    <van-nav-bar title="登陆" left-text="返回" right-text="按钮" left-arrow @click-left="back()"/>
    <div class="list">
      <!-- <div>111</div><div>222</div> -->
      <a class="listItem" v-for="item in 1" :key="item" href="javascript:void(0)">
         <!--  <div class="itemImg">
            <img src="http://localhost:8080/file/getFileById?id=161260481709511111" >
          </div> -->
          <div class="itemBox">
            <img src="http://localhost:8080/file/getFileById?id=161260481709511111">
            <div class="itemWord">
              <h2>标题：新款IPHONE X 便宜卖了，走量</h2>
              <h3>￥:5000</h3>
              <p>小小的个人店铺</p>
            </div>
          </div>
        
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  name: "LoginForm",
    back() {
      this.$router.push("/me");
    },
  methods:{
       back() {
      this.$router.push("/me");
    },
  },
  mounted() {
    // console.log("mounted-LoginForm");
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