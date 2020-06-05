<!--  -->
<template>
  <div class="photo-box">
    <div class="photo-list-nav">
      <dl>
        <dt>快速定位</dt>
        <dt v-for="(item,index) in photoList" @click="navClick(index)">{{item.title}}</dt>
      </dl>
    </div>
    <div class="photo-content">
      <div class="center">
        <div class="imgBox">
          <img :src="photo.url" alt />
        </div>
        <div class="info">
          <div>{{photo.title}}</div>
          <div>{{photo.info}}</div>
        </div>
      </div>
      <div class="button-box">
        <div class="left" v-show="leftIsShow" @click="leftClick">上一张</div>
        <div class="left" v-show="!leftIsShow">END</div>
        <div class="right" v-show="rightIsShow" @click="rightClick">下一张</div>
        <div class="right" v-show="!rightIsShow">END</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoShow",
  data() {
    return {
      photoList: [],
      photo: {},
      srcUrl: "",
      title: "",
      photoInfo: "",
      defaultIndex: 0,
      leftIsShow: true,
      rightIsShow: true
    };
  },
  components: {},
  methods: {
    getPhotoInfo() {
      this.$http
        .get("/api/getPhotoInfo", {})
        .then(res => {
          console.log("获取图片数据", res);
          this.photoList = res.data;
          this.initPhoto();
        })
        .catch(err => {
          console.log(err);
        });
    },
    initPhoto() {
      this.photo = this.photoList[this.defaultIndex];
    },
    navClick(index) {
      console.log(index);
      this.defaultIndex = index;
      this.photo = this.photoList[this.defaultIndex];
    },
    leftClick() {
      this.defaultIndex -= 1;
      console.log(this.defaultIndex);
      if (this.defaultIndex === -1) {
        this.leftIsShow = false;
      } else {
        this.rightIsShow = true;
        this.photo = this.photoList[this.defaultIndex];
      }
    },
    rightClick() {
      this.defaultIndex += 1;
      console.log(this.defaultIndex);
      console.log(this.photoList.length - 1);
      if (this.defaultIndex === this.photoList.length) {
        this.rightIsShow = false;
      } else {
        this.leftIsShow = true;
        this.photo = this.photoList[this.defaultIndex];
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getPhotoInfo();
    this.defaultIndex = this.$route.query.itemindex;
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.photo-box {
  display: flex;
  width: 100%;
  margin-top: 44px;
  height: 100%;
  background-color: #fff;
  justify-content: center;
}

.photo-list-nav {
  display: flex;
  width: 13rem;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
}
.photo-list-nav dl {
  color: #fff;
  font-weight: 700;
  text-align: center;
}
.photo-list-nav dt {
  height: 3rem;
  line-height: 3rem;
  margin-bottom: 1rem;
}
.photo-list-nav dt:hover {
  cursor: pointer;
}
.photo-content {
  display: flex;
  flex: 1;
  height: 100%;
  background-color: #000;
  flex-direction: column;
  
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  height: 90%;
  background-color: #000;
}
.button-box{
  display: flex;
    height: 10%;
}
.left,
.right {

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: ;
  font-weight: 700;
  background-color: #000;
}
.left:hover,
.right:hover {
  cursor: pointer;
  background-color:rgb(110, 110, 110);
}
.imgBox {
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.info {
  display: flex;
  flex-direction: column;
  height: 15%;
}
.info div {
  flex: 1;
  color: #fff;
  display: flex;

  justify-content: center;
  align-items: center;
}
.info div:first-child {
  font-size: 1.5em;
  font-weight: 700;
  letter-spacing: 0.2rem;
}
</style>