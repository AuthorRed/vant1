<template>
  <div class="container">
    <van-nav-bar
      title="添加商品"
      left-text="返回"
      left-arrow
      @click-left="back()"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="title"
        name="title"
        label="标题"
        placeholder="商品标题"
        :rules="[{ required: true, message: '请填写商品标题' }]"
      />
      <van-field v-model="price" name="price" label="单价" placeholder="单价" />
      <van-field
        v-model="seller"
        name="seller"
        label="商家"
        placeholder="商家"
        readonly
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getRequest, postRequest,postFile } from "@/api/http.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "",
      price: "",
      seller: "",
      user: {},
      uploader: [],
      commodityId:0,
    };
  },
  name: "CommodityAdd",

  methods: {
    getFid(){
      getRequest('/commodity/getCommodityId').then((res) => {
        console.log(res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.commodityId) {
          this.commodityId = payload.extenal.commodityId
          console.log('commodityId',this.commodityId)
        } else {
          Toast.fail("现在无法添加商品，请刷新页面重新进入！");
        }
      });
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
    afterRead(file) {
      console.log(file);
      if(this.commodityId==0 ||isNaN(this.commodityId)){
        Toast.fail("现在无法添加商品，请刷新页面重新进入！");
      }
      let param = new FormData(); //创建form对象
      param.append('file',file.file);//通过append向form对象添加数据
      param.append('fid',this.commodityId);
      postFile('http://localhost:8080/file/fileUpload',param).then(res=>{
        console.log(res.data);
        if (200 == res.data.code) {
          Toast.success("上传成功！");
        } else {
          Toast.fail("上传失败:" + res.data.msg);
        }
      })
    },
    onSubmit(values) {
      console.log("onSubmit", values);
      var fd = new FormData();
      fd.id = this.commodityId;
      fd.title = this.title;
      fd.price = this.price;
      fd.seller = this.seller;
      console.log("fd", fd);
      postRequest("/commodity/addCommodity", fd).then((res) => {
        console.log("res.data", res.data);
        if (200 == res.data.code) {
          // let user = res.data.extenal.user;
          // sessionStorage.setItem("user", JSON.stringify(res.data.extenal.user));
          Toast.success("添加成功！");
          this.$parent.onRefresh();
          this.$router.push("/me/commodityList");
        } else {
          Toast.fail("添加失败:" + res.data.msg);
        }
      });
    },
    back() {
      this.$router.push("/me/commodityList");
    },
  },
  mounted() {
    console.log("mounted-CommodityAdd");
    this.getUser();
    this.getFid();
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
</style>