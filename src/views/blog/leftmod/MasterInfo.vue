<!--  -->
<template>
  <div class="master-info">
    <div class="base-info">
      <div>
        <slot name="avatar"></slot>
      </div>
      <div class="user">
        <slot name="name"></slot>
        <slot name="motto"></slot>
      </div>
    </div>

    <div class="mid-tab">博客版块数据</div>
    <div class="article-info">
      <dl>
        <dt>{{BlogLikedSum}}</dt>
        <dt>获赞</dt>
      </dl>
      <dl>
        <dt>{{blogReadSum}}</dt>
        <dt>访问</dt>
      </dl>
      <dl>
        <dt>{{blogOriginalSum}}</dt>
        <dt>文章</dt>
      </dl>
      <dl>
        <dt>{{blogRelaySum}}</dt>
        <dt>转载</dt>
      </dl>
    </div>

    <div class="mid-tab">摄影版块数据</div>
    <div class="img-info">
      <dl>
        <dt>{{photoLikedSum}}</dt>
        <dt>获赞</dt>
      </dl>
      <dl>
        <dt>{{photoReadSum}}</dt>
        <dt>访问</dt>
      </dl>
      <dl>
        <dt>{{photoSum}}</dt>
        <dt>作品</dt>
      </dl>
      <dl>
        <dt></dt>
        <dt></dt>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "MasterInfo",
  data() {
    return {
      blogReadSum: 0,
      BlogLikedSum: 0,
      blogRelaySum: 0,
      blogOriginalSum: 0,
      photoSum:0,
      photoLikedSum:0,
      photoReadSum:0

    };
  },
  components: {},
  methods: {
    getSumInfo() {
      this.$http.get("/api/getSumInfo").then(res => {
        // console.log('获取博客统计数据',res)
        this.BlogLikedSum = res.data[0][0].likednumSum;
        this.blogReadSum = res.data[1][0].readnumSum;
        this.blogRelaySum = res.data[2][0].relaySum;
        this.blogOriginalSum = res.data[3][0].originalSum;
      });

      this.$http.get("/api/getPhotoSumInfo").then(res=>{
        // console.log('获取图片的统计数据',res);
        this.photoSum = res.data[0][0].photoSum;
        this.photoLikedSum = res.data[1][0].likednumSum;
        this.photoReadSum = res.data[2][0].readnumSum;
      })
    }

  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getSumInfo();
  },
  activated() {
    this.$bus.$on("fresh", msg => {
      this.getSumInfo();
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.master-info {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
}
.base-info {
  display: flex;
}
.user {
  width: 17rem;
  height: 6rem;
  padding-left: 1rem;
}
.name {
  font-size: 1.25em;
  padding-left: 0.5rem;
}
.motto {
  font-size: 0.8125em;
  line-height: 2rem;
  margin-top: 0.5rem;
  color: #999aaa;
  letter-spacing: 0.1rem;
}
.avatar {
  width: 6rem;
}
.mid-tab {

  /* line-height: 24px; */
  padding-left: 1rem;
  margin: 0.8rem 0;
  border-left: 0.5rem solid var(--color-tint);
}
.article-info,
.img-info {
  display: flex;
}
dl {
  flex: 1;
  text-align: center;
}
dt {
  line-height: 20px;
}
dl > dt:nth-child(2) {
  font-size: 0.875em;
  color: #999aaa;
}
</style>