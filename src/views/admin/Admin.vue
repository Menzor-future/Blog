<!--  -->
<template>
  <div class="box">
    <div class="left-nav">
      <p>您好,管理员</p>
      <div
        v-for="(item,index) in nav"
        @click="navItemClick(index)"
        :class="{active:index===currentIndex}"
      >{{item}}</div>
    </div>
    <div class="right-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      editIsShow: false,
      nav: ["发布博文", "发布图片", "博文管理", "图片管理"],
      currentIndex: 0
    };
  },
  components: {},
  methods: {
    navItemClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.replace("/blogpublish").catch(err => {err});
          break;
        case 1:
          this.$router.replace("/photopublish").catch(err => {err});
          break;
        case 2:
          this.$router.replace("/blogmanage").catch(err => {err});
          break;
        case 3:
          this.$router.replace("/photomanage").catch(err => {err});
          break;
      }
    },

    //页面创建（刷新）时，根据当前二级路由路径，导航栏应该保持选中哪一个。
    whichNav(){
      switch(this.$route.path){
        case '/blogpublish':
          this.currentIndex = 0;
          break;
        case '/photopublish':
          this.currentIndex = 1;
          break;
        case '/blogmanage':
          this.currentIndex = 2;
          break;
        case '/photomanage':
          this.currentIndex = 3;
          break;
      }
    }

  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.whichNav();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.box {
  display: flex;
  height: 100%;
  margin-top: 54px;
  justify-content: center;
}
.left-nav {
  width: 15%;
  background-color: #fff;
}
.left-nav > div {
  box-sizing: content-box;
  height: 5rem;
  line-height: 5rem;
  color: var(--color-tint);
  font-size: 1.25em;
  text-align: center;
  letter-spacing: 0.1rem;
}
.active {
  border-top: 0.2rem solid var(--color-tint);
  border-bottom: 0.2rem solid var(--color-tint);
  border-left: 0.1rem solid var(--color-tint);
}
.left-nav > p {
  height: 15rem;
  margin-bottom: 0.5rem;
  line-height: 15rem;
  color: #fff;
  background-color: var(--color-tint);
  font-size: 1.375em;
  font-weight: 700;
  text-align: center;
}
.right-view {
  width: 80%;
  background-color: #fff;
}
</style>