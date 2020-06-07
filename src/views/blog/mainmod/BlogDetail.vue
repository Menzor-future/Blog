<!--  -->
<template>
  <div class="blogDetailBox">
    <toast v-show="tipIsShow" class="tip">{{tipMsg}}</toast>
    <mavon-editor

      v-show="detailIsShow"
      class="md"
      style="z-index:3"
      :value="this.detail.md_content"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :ishljs = "prop.ishljs"
    ></mavon-editor>
    <div class="like" v-show="!isTap" @click="likedClick">
      <div>如果你觉得文章不错，请点击此处赞一个</div>
    </div>
    <div class="liked" v-show="isTap" @click="likedClick">
      <div>酷！已点赞~</div>
    </div>
  </div>
</template>

<script>
import Toast from "components/common/Toast";

export default {
  name: "BlogDetail",
  data() {
    return {
      result: null,
      detail: "",
      detailId: null,
      userIp: "",
      detailIsShow: false,
      tipIsShow: true,
      tipMsg: "正在加载……稍等哦~",
      isTap: false,
      likedTip: ""
    };
  },
  components: {
    Toast
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: true,
        toolbarsFlag: false,
        scrollStyle: true,
        ishljs:true
      };
      return data;
    }
  },
  methods: {
    likedClick() {
      //这里是切换是否点赞的样式。
      //如果用户isTap等于true，说明用户点了赞，将用户ip存到已点赞数据库中。
      if (this.result[1].length > 0 && this.isTap == true) {
        this.isTap = false;
        this.$http.post("/api/removeLikedUserIp",{
          id:this.detailId,
          removeIp:this.userIp
        })
      } else {
        this.$http
          .post("/api/addLikedUserIp", {
            liked_user_ip: this.userIp,
            id: this.detailId 
          })
          .then(res => {
            // console.log(res);
            this.isTap = true;
          });
        }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 通过路由拿到上一页面传过来的文章id
    this.detailId = parseInt(this.$route.query.id);

    // 组件开始创建，请求服务器文章数据
    this.$http.get("/api/getBlogDetail", { params: { id: this.detailId } })
      .then(res => {
        // console.log(res);
        // 拿到数据了，先放进result里。
        this.result = res.data.result;
        this.detail = res.data.result[0][0];
        this.userIp = res.data.ip;


        //如果符合筛选条件的点赞ip列表的长度大于零，说明此ip曾经点赞过
        if (this.result[1].length > 0) {
          this.isTap = true;
        }else{
          this.isTap =false;
        }

        // 拿到数据后去掉显示‘加载中’的提示框
        this.tipIsShow = false;
        // 显示文章数据
        this.detailIsShow = true;
      });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },
  activated(){

  },
  destroyed() {
    this.$bus.$emit("fresh",'刷新数据')
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.blogDetailBox {
  min-height: 100vh;
}
.like {
  /* display: none; */
  width: 100%;
  color: var(--color-tint);
  background-color: #fff;
  height: 40px;
  line-height: 40px;

  text-align: center;
}
.liked {
  width: 100%;
  color: #fff;
  background-color: var(--color-tint);
  height: 40px;
  line-height: 40px;

  text-align: center;
}
.v-note-wrapper{
  min-width: 0;
}
</style>