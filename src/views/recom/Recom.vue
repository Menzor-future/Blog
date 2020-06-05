<!--  -->
<template>
  <div class="admin">
    
    <login-box></login-box>
  </div>
</template>

<script>
import LoginBox from "components/common/LoginBox";
export default {
  name: "Recom",
  data() {
    return {};
  },
  components: {
    LoginBox,
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
.admin {
  display: flex;
  height: 100%;
  margin-top: 54px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

</style>