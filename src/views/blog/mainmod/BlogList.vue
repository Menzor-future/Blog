<!--  -->
<template>
  <div class="blog-list"> 
    <div class="blog-title" v-for="item in blogList" @click="itemClick(item)" >
      <div class="title">{{item.title}}</div>
      <div class="blog-info">
        <div>阅读数：{{item.read_num}}</div>
        <div>点赞数：{{item.liked_num}}</div>
        <div>文章类型：{{item.blog_type}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'BlogList',
  data() {
    return {
      blogList:[],
    }
  },
  components:{
    
  },
  methods:{
    getBlogList(){
      this.$http.get('/api/getBlogList',{}).then( res =>{
        console.log('res',res)
        this.blogList = res.data
      }).catch( err => {
        console.log(err)
      })
    },
    itemClick(item){
      this.$router.push({path:'/blogdetail',query:{id:item.id}})
    }
  },
//生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getBlogList()
  },
//生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    
  },
  activated(){
        
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.blog-list{
  width: 100wh;
  height: 100vh;
  
}
.blog-title{
  width: 100%;
  padding:1rem 1.5rem;
  margin-bottom: 1rem;
  background-color: #fff;
}
.title{
  font-size: 1.375em;
  padding-left: 1rem;
  border-left: 1rem solid var(--color-tint);
  word-break: break-all;
}
.title:hover{

  text-decoration-line: underline;
}


.blog-title:hover{
    cursor:pointer;
  border:0.2rem solid var(--color-tint);

}
.blog-info{
  display: flex;
  width: 100%;
  justify-content: center;
}
.blog-info div{
  padding: 1.5rem 1rem 0 ;
}
</style>