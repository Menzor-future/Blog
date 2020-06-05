<!--  -->
<template>
  <div class="home">
    <div class="title">欢迎，这里是郑铭泽的博客</div>
    <div class="item-box">
      <div>
        <div class="item-title">学习</div>
        <div>前端之路漫漫，大不必慌张</div>
      </div>
      <div>
        <div class="item-title">生活</div>
        <div>好好生活吧，活着就好说。</div>
      </div>
      <div>
        <div class="item-title">优雅</div>
        <div>脾气要压住，眼光向前看。</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.home {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin-top: 54px;
}
.title {
  height: 35rem;
  font-size: 2.5em;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.item-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.item-box > div {
  width: 27rem;
  font-size: 1.1em;
  text-align: center;
}
.item-title {

    font-size: 1.5em;
  color: var(--color-tint);
  margin-bottom: 1rem;
}
/* 媒体查询，适应屏幕布局 */
@media screen and (max-width: 600px) {
  .title{
    height: 30rem;
  }
  .item-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 30rem;
  }
  .item-box > div {
    width: 100%;
    text-align: center;
  }
}
@media screen and (max-width:371px){
  .title {

  font-size: 1.875em;
  text-decoration: underline;
  text-decoration-color: var(--color-tint);
}
}
</style>