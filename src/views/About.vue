<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-uploader v-model="fileList" :after-read="afterRead" />
    <div class="my_modal">模态框</div>
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
<style lang="css" scoped>
.my_modal {
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}