<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-uploader :after-read="afterRead" />
  </div>
</template>
<script>
import {getRequest,postFile,postRequest} from '@/api/http.js'
export default {
   name: 'About',
  // components: {
  //   EmojiPicker
  // }
  
  methods :{
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);

      let param = new FormData(); //创建form对象
      param.append('file',file.file);//通过append向form对象添加数据
      postFile('http://localhost:8080/file/fileUpload',param).then(response=>{
            console.log(response.data);
          })
    },
    getTimestamp: function(){
      console.log(getRequest);
      getRequest('http://localhost:8080/file/test').then(res=>{
        console.log('response:',res.data);
      })
    }
  },
  mounted (){
    console.log('mounted-about');
    this.getTimestamp();
  }
}
</script>