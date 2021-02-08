<template>
  <div class="home">

    <HelloWorld msg="欢迎来到服务问答网！"/>
    <van-search v-model="searchValue" disabled  @click="toSearch" placeholder="请输入搜索关键词" />

    <transition name="slide">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      searchValue: "",
    };
  },
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted : function (){
  console.log('mounted-Home');
  },
  methods :{
    toSearch(){
      console.log('to search');
      this.$router.push("/searchList");
    }
  }
}
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

</style>