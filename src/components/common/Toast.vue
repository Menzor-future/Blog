<!--  -->
<template>
  <div class="toast">
    <div>
      Tip:<slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
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
.toast {
  z-index: 100;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 2px;
}
</style>