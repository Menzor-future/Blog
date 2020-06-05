<!--  -->
<template>
  <div class="right-mod">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'RightMod',
  data() {
    return {
      show:false
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
		// //设置自适应屏幕，根据获得的可视宽度判断是否显示
		// let w = document.documentElement.offsetWidth || document.body.offsetWidth;
    // console.log(w)
		// if(w > 1000){
		// 	this.show = true;
		// }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.right-mod{
  display: none;
  min-height:100vh;
  min-width: 15%;
  /* background-color: #fff; */
    border:2px solid #fff;
}
/* @media screen and (min-width: 1600px){
   .right-mod{
     display: block;
   } 
} */

</style>