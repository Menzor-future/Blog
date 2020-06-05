<template>
  <div id="app">
    <!-- <label for="check">导航</label>
    <input id="check" type="checkbox" name="" > -->
    <nav-bar id="nav-bar"></nav-bar>
    <keep-alive exclude="PhotoShow">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from 'components/common/navbar/NavBar'
import Home from 'views/home/Home.vue'
export default {
  name: 'App',
  components: {
    Home,
    NavBar
  }
}
</script>

<style>
@import "assets/css/base.css";
#app{
  height: 100%;
}
#check{
  display: none;
  position: absolute;
  top: 100px;
}
#check:checked + div{
display: none;
}
</style>
