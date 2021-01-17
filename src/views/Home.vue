<template>
  <div class="home">

    <HelloWorld msg="欢迎来到服务问答网！"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted : function (){
  console.log('mounted-Home');
  }
}
</script>
