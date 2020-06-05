<!--  -->
<template>
  <div class="left-mod">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'LeftMod',
  data() {
    return {
      
    }
  },
  components:{

  },
  methods:{
    
  },
//生命周期 - 创建完成（访问当前this实例）
  created() {
    
  },
//生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.left-mod{
  min-height:100vh;
  width: 25rem;
  /* border:2px solid #fff; */
}


/* @media screen and (max-width: 1600px) {
  .left-mod{
    width: 20%;
  }
} */
@media screen and (max-width: 500px) {
  .left-mod{
    display: none;
  }
}
</style>