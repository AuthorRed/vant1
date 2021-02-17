<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-uploader :after-read="afterRead" />
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
import {getRequest,postFile,postRequest} from '@/api/http.js'
export default {
  data(){
    return {
      fileList:[]
    }
  },
   name: 'About',
  // components: {
  //   EmojiPicker
  // }
  
  methods :{
    afterRead(file) {
      console.log(file);
      let param = new FormData(); //创建form对象
      param.append('file',file.file);//通过append向form对象添加数据
      postFile('http://localhost:8080/file/fileUpload',param).then(response=>{
            console.log(response.data);
          })
      }
    // },
    // getTimestamp: function(){
    //   console.log(getRequest);
    //   getRequest('http://localhost:8080/file/test').then(res=>{
    //     console.log('response:',res.data);
    //   })
    // }
  },
  mounted (){
    console.log('mounted-about');
  }
}
</script>
<style lang="less" scoped>
@keyframes Rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-container{
  display: flex;
  justify-content: center;
  .loader {
    width: 30px;
    height: 30px;
    border-top:2px solid red;
    border-bottom:2px solid red;
    border-left:2px solid rgb(243,243,243);
    border-right:2px solid red;
    border-radius: 50%;
    animation: Rotate .6s linear infinite;
  }
}



</style>