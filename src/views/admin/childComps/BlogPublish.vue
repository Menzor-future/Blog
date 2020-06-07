<template>
  <div class="edit-box">
    <!-- 输入改变事件：@change="updateDoc" -->
    <div class="title">
      <input type="text" class="title-input" v-model="title" placeholder="请输入文章标题" />
      <input type="text" class="title-input" v-model="blogType" placeholder="请输入文章类型：转载/原创" />
    </div>
    <mavon-editor
      ref="md"
      v-model="context"
      :toolbars="toolbars"
      @imgAdd="$imgAdd"
      @keydown
      @save="saveDoc"
      @imgDel="$imgDel"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogPublish",
  props: {
    msg: String
  },
  data() {
    return {
      context: " ", //输入的数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      },
      html_content: null,
      md_content: null,
      title: "",
      // read_num : 1,
      // liked_num : 1,
      blogType: ""
    };
  },
  computed: {},
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "http://120.79.187.154:888/updateimg",
        // 本地调试时，应当启用的地址
        // url: "http://localhost:888/updateimg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          // 第二步.将返回的url替换到文本原位置!
          console.log(res);
          let resUrl = "http://120.79.187.154:888" + res.data;
          // let resUrl = "http://localhost:888" + res.data;
          this.$refs.md.$img2Url(pos, resUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    $imgDel(pos) {
      console.log(pos[0]);
      let url = pos[0]
      let delUrl = url.substring(29);
      console.log('删除服务器中的'+delUrl+'文件');
      this.$http.post("http://120.79.187.154:888/delBlogImg",{delName:delUrl}).then(res => {
        console.log('删除图片成功',res)
      });
      // 本地调试时，应当启用的地址
      // this.$http.post("http://localhost:888/delBlogImg",{delName:delUrl}).then(res => {
      //   console.log('删除图片成功',res)
      // });
    },
    saveDoc(markdown, html) {
      let saveTime =
        this.$moment(this.createTime).format("YYYY-MM-DD HH:mm") + "";
      console.log(saveTime);
      this.$http
        .post("/api/saveHtmlContent", {
          html_content: html + "",
          md_content: markdown,
          title: this.title,
          save_time: saveTime,
          read_num: 0,
          liked_num: 0,
          blog_type: this.blogType
        })
        .then(res => {
          console.log("res", res);
        });
      // console.log("saveDoc被触发，markdown内容" + markdown);
      // console.log("saveDoc被触发，html内容" + html);
    }
    //     updateDoc(markdown,html){
    // console.log('updateDoc被触发，markdown内容'+markdown);
    // console.log('updateDoc被触发，html内容'+html);
    //     },
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit-box {
  padding: 1rem;
}
.title {
  width: 100%;
  height: 20rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.title-input {
  width: 60%;
  height: 5rem;
  padding-left: 1rem;
  box-shadow: 0.2rem 0.2rem 0 0.4rem rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}
</style>
