<template>
<div id="home">
  <nav-bar class="home-nav">
    <template v-slot:center>
      <div>购物街</div>
    </template>
  </nav-bar>
  <home-swiper :banners="banners" />
  <recommend-view :recommends="recommends" />
</div>
</template>

<script>

import NavBar from 'components/content/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created(){
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color:var(--color-tint);
    color: #fff;
  }
</style>
