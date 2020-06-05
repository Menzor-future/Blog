<!--  -->
<template>
  <div  class="wrapper" ref="wrapper" >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    };
  },
  methods:{
    //先判断scroll有没有存在
    scrollTo(x,y,time=800){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      // console.log('图片加载完成，使用scroll的refresh重新计算高度')
    }
  },
  computed:{
    getCurrentY(){
      return this.scroll.y
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      scrollY:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    // 3.监听底部上拉加载更多事件
    if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
      // 传到父组件
      this.$emit('pullingUp')
    })
    }

  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
