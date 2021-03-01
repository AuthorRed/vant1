<template>
  <div class="container">
    <div v-if="showLoading" class="myloading">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </div>
    <van-nav-bar
      title="评价晒单"
      left-text="返回"
      left-arrow
      @click-left="back()"
    />
    <van-form @submit="onSubmit">
      
      <van-field
        
        name="rate"
        label="评分"
      >
        <template #input>
            <van-rate v-model="rate" />
          </template>
      </van-field>
      <van-field
        v-model="text"
        type="textarea"
        autosize
        name="text"
        label="评价内容"
        placeholder="评价内容"
        :rules="[{ required: true, message: '请填写评价内容' }]"
      />

  
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" max-count="10"/>
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
      rate:3,
      text:'',
      uploader: [],
      commentId:0,
      showLoading:false,
      commodityId:0,
    };
  },
  name: "CommentAdd",

  methods: {
    getFid(){
      getRequest('/comment/getCommentId').then((res) => {
        console.log(res.data);
        let payload = res.data;
        if (200 == payload.code && payload.extenal.commentId) {
          this.commentId = payload.extenal.commentId
          console.log('commentId',this.commentId)
        } else {
          Toast.fail("现在无法添加商品，请刷新页面重新进入！");
        }
      });
    },
    afterRead(file) {
      console.log(file);
      if(this.commentId==0 ||isNaN(this.commentId)){
        Toast.fail("现在无法添加商品，请刷新页面重新进入！");
      }
      let param = new FormData(); //创建form对象
      param.append('file',file.file);//通过append向form对象添加数据
      param.append('fid',this.commentId);
      param.append('token',this.$store.state.user.token);
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
      this.showLoading = true;
      console.log("onSubmit", values);
      var fd = new FormData();
      fd.id = this.commentId;
      fd.rate = this.rate;
      fd.text = this.text;
      fd.commodityId = this.commodityId;
      fd.token = this.$store.state.user.token;
      fd.hasAttach = this.uploader.length>0 ? 1:0;
      console.log("fd", fd);
      postRequest("/comment/save", fd).then((res) => {
        this.getFid();
        this.showLoading = false;
        console.log("res.data", res.data);
        if (200 == res.data.code) {
          Toast.success("添加成功！");
        } else {
          // Toast.fail("添加失败:" + res.data.msg);
        }
          this.back();
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    console.log("mounted-CommentAdd");
    console.log("commodityId",this.commodityId);
    this.commodityId = this.$route.query.commodityId;
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

@keyframes Rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.myloading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0,0,0,.7);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

 .loader-container{

    .loader {
      width: 30px;
      height: 30px;
      border-top:2px solid black;
      border-bottom:2px solid black;
      border-left:2px solid rgb(243,243,243);
      border-right:2px solid black;
      border-radius: 50%;
      animation: Rotate .6s linear infinite;
    }
}
}
</style>