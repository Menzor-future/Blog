<!--  -->
<template>
  <div class="photo-box">
    <div v-for="(item,index) in photoList" class="item">
      <div class="info-box" @click="itemClick(index)">
        <div class="zoomImage" :style="{backgroundImage:'url('+item.url+')'}"></div>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo",
  data() {
    return {
      photoList: []
    };
  },
  components: {},
  methods: {
    getPhotoInfo() {
      this.$http
        .get("/api/getPhotoInfo", {})
        .then(res => {
          // console.log("获取图片数据", res);
          this.photoList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    itemClick(index){
      this.$router.push({path:'/photoshow',query:{itemindex:index}})
      // console.log(index)
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getPhotoInfo();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>

/* @import url(); 引入css类 */
.photo-box {
  width: 100%;
  margin-top: 54px;
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}
.item {

  width: 22rem;

  display: flex;
  justify-content: center;
  padding: 1rem;
}
.item:hover {
  cursor: pointer;
}
.info-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 95%;
  background-color: #fff;
}
.info-box:hover {
  box-shadow: 0.2rem 0.2rem 1rem 0.3rem var(--color-boxshadow);
}
.zoomImage {
  width: 100%;
  height: 0;
  padding-bottom: 80%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.title {
  color: #000;
  width: 100%;
  text-align: center;
  font-weight: 500;
  line-height: 3rem;

}
.title:hover {
  color: var(--color-tint);
}

</style>