<!--  -->
<template>
  <div class="photo-publish-box">
    <div class="img-box">
      <img :src="imgSrc" alt />
    </div>
    <a class="file" href="#">
      <input type="file" accept="image/*" id="file" ref="imgInput" @change="change($event)" />点击上传作品
    </a>
    <input type="text" v-model="title" class="title" autofocus placeholder="请在此处输入作品名" />
    <textarea type="text" v-model="info" class="info" maxlength="100" placeholder="请在此处输入作品描述" />
    <div class="submitButton" @click="submit">点我发布作品</div>
  </div>
</template>

<script>
export default {
  name: "PhotoPublish",
  data() {
    return {
      //此处注意，别名路径需用require引用。
      imgSrc: require("assets/img/admin/photopublish/seat.jpg"),
      title: "",
      info: "",
      formdata: null
    };
  },
  components: {},
  methods: {
    submit() {
      var that = this;
      console.log("开始提交数据");
      if (this.title === "") {
        console.log("标题不能为空");
      } else {
        this.$http({
          // url: "http://120.79.187.154:888/updateimg",
          url: "http://localhost:888/phototPost",
          method: "post",
          data: this.formdata,
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            console.log(
              "提交作品信息，将服务器图片从暂存文件夹移到正式文件夹，清空暂存文件夹",
              res
            );
            // 1.let resUrl = "http://120.79.187.154:3000" + res.data;
            let newUrl = "http://localhost:888" + res.data;
            // 2.用返回的url替换预览图片连接
            this.imgSrc = newUrl;
            // 3.提交作品数据到数据库
            that.$http
              .post("/api/postPhotoInfo", {
                title: "《" + that.title + "》",
                info: that.info,
                url: that.imgSrc
              })
              .then(res => {
                console.log("上传作品信息到数据库", res);
              })
              .catch(err => {
                console.log("作品提交错误", err);
              });
          })
          .catch(err => {
            console.log("图片上传错误", err);
          });
      }

    },
    change(e) {
      let file = e.target.files[0];
      let formdata = new FormData();
      //此处imgFile要对应后台图片名
      formdata.append("imgFile", file);
      this.formdata = formdata;
      //将图片数据放到表单中
      this.$http({
        // url: "http://120.79.187.154:888/updateimg",
        url: "http://localhost:888/phototPreview",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log("图片上传回调res", res);
          // let resUrl = "http://120.79.187.154:3000" + res.data;
          let resUrl = "http://localhost:888" + res.data;
          // 用返回的url替换预览图片连接
          this.imgSrc = resUrl;
        })
        .catch(err => {
          console.log("图片上传错误", err);
        });
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
.photo-publish-box {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.img-box {
  width: 30rem;
  max-height: 30rem;
  text-align: center;
}
img {
  width: auto;
  height: auto;
  max-height: 30rem;
  max-width: 30rem;
}
.title {
  width: 45rem;
  height: 4rem;
  padding-left: 1rem;
  box-shadow: 0.2rem 0.2rem 0 0.4rem rgba(0, 0, 0, 0.05);
}
.info {
  width: 45rem;
  height: 9rem;
  padding: 1rem;
  line-height: 2rem;
  box-shadow: 0.2rem 0.2rem  0.4rem rgba(0, 0, 0, 0.05);
}
.file {
  display: inline-block;
  position: relative;
  width: 45rem;

  height: 4rem;
  line-height: 4rem;
  text-align: center;
  color: var(--color-tint);
  border: 0.1rem solid var(--color-tint);

  overflow: hidden;
}
#file {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 4rem;
  cursor: pointer;
  opacity: 0;
}
.submitButton {
  width: 45rem;
  height: 4rem;
  line-height: 3.8rem;
  /* 行高要减掉边框 */
  text-align: center;
  color: var(--color-tint);
  border: 0.1rem solid var(--color-tint);
}
</style>