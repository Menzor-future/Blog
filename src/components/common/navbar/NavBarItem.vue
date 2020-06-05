<!--  -->
<template>
  <div class="nav-bar-item" @click="itemClick">
    <div :class="activeStyle" class="item-text" >
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBarItem",
  props: {
    path: {
      type: String,
      default: "/home"
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? 'active' : ''
    }
  },
  methods: {
    itemClick(){
        this.$router.push(this.path).catch(err => {err})
    }

  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.nav-bar-item {

  width: 200px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
}
.active {
  color: var(--color-high-text);
  font-weight: 600;
}
.item-text:hover{
  color:#fff;
    font-weight: 600;
  background-color: var(--color-high-text);
  cursor:pointer;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
}



</style>