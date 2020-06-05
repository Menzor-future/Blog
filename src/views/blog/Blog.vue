<!--  -->
<template>
  <div class="blog-box">
    <left-mod>
      <master-info>
        <!-- 阿泽：插槽封装，只需要在此界面修改图片或者文字，而不需要再了解深层次的东西 -->
        <img slot="avatar" class="avatar" src="~assets/img/blog/master-info/avatar.jpg" alt />
        <div slot="name" class="name">郑铭泽</div>
        <div slot="motto" class="motto">君不见，高堂明镜悲白发，朝如青丝暮成雪</div>
      </master-info>
    </left-mod>
    <main-mod>
      <router-view></router-view>
    </main-mod>
    <right-mod></right-mod>
  </div>
</template>

<script>
import LeftMod from "components/common/blogmod/LeftMod";
import MainMod from "components/common/blogmod/MainMod";
import RightMod from "components/common/blogmod/RightMod";

import MasterInfo from "./leftmod/MasterInfo";
export default {
  name: "Blog",
  data() {
    return {};
  },
  components: {
    MainMod,
    LeftMod,
    RightMod,
    MasterInfo
  },
  methods: {
    // saveHtmlContent() {
    //   this.$http
    //     .post("/api/saveHtmlContent", { htmlcontent: "aaa", mdcontent: "bbb" })
    //     .then(res => {
    //       console.log("res", res);
    //     });
    // },
    // setValue() {
    //   // axios.post('/', {})
    //   this.$http
    //     .post("/api/setValue", {
    //       id: 10,
    //       name: "sala"
    //     })
    //     .then(res => {
    //       console.log("res", res);
    //     });
    // }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // this.saveHtmlContent();
    // this.setValue();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.blog-box {
  display: flex;
  max-width: 100%;
  width: 100%;
  padding: 1rem;
  margin-top: 54px;
  justify-content: center;
  z-index: 2;
}
</style>