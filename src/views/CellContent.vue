<template>
  <div class="container">
    <div class="back-arrow" @click="back()"><h1>&lt;</h1></div>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
<h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
    <h1>CellContent..</h1>
  </div>
</template>
<script>
export default {
  name: "CellContent",

  methods: {
    back(){
      this.$router.go(-1);
    }
  },
  mounted() {
    console.log("mounted-CellContent");
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

  background: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  z-index: 99;
}
</style>