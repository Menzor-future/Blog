<!--  -->
<template>
  <div class="nav-bar-box">
    <!-- <div class="logo">
      <img slot="item-img" src="~assets/img/siteLogo.png"></img>
    </div> -->
    <nav-bar-item path="/home">
      <div slot="item-text">首页</div>
    </nav-bar-item>
    <nav-bar-item path="/blog">
      <div slot="item-text">博客</div>
    </nav-bar-item>
    <nav-bar-item path="/photo">
      <div slot="item-text">摄影</div>
    </nav-bar-item>
    <nav-bar-item path="/recom">
      <div slot="item-text">勿点</div>
    </nav-bar-item>
  </div>
</template>

<script>
import NavBarItem from "./NavBarItem";
export default {
  name: "NavBar",
  data() {
    return {};
  },
  components: {
    NavBarItem
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.nav-bar-box {
  display: flex;
  position: fixed;
  z-index:9;
  width: 100%;
  top:0;
  height: 44px;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  background-color: var(--color-background);
  box-shadow: 0px 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.05);

}
.logo img{
  max-height: 40px;
  flex:1;
  vertical-align: text-bottom;
}
</style>