<!--  -->
<template>
  <div class="main-mod">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'MainMod',
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
.main-mod{
  width: 65rem;
  margin-left: 1rem;
}
/* @media screen and (min-width: 1600px) {
  .main-mod{
    width: 60%;
  }
} */

</style>