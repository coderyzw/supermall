<template>
<div id="home" class="wrapper">
  <nav-bar class="home-nav">
    <template v-slot:center>
      <div>购物街</div>
    </template>
  </nav-bar>
   <tab-control :titles="['流行','新款','精选']" 
   @tabClick="tabClick" 
    ref="TabControl1" 
    class="tab-control" 
    v-show="isTabFixed"/>

  <scroll class="content" ref="scroll" 
  :probe-type='3' 
  @scroll="contentScroll" 
  :pull-up-load="true" 
  @pullingUp="loadmore">

    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends" />
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick" 
    ref="TabControl2" />
    <good-list :goods="shouGoods" />

  </scroll>

  <back-top @click.native="backClick" v-show="isShow" />

</div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/content/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import BackTop from 'components/content/backtob/BackTop'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop,
    },
    data() {
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType:'pop',
        isShow:false,
        taboffsetTop:0,
        isLoad:false,
        isTabFixed:false
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    updated() {
      // 1.获取tabControl的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      // if (!this.isLoad) {
      //   console.log(this.taboffsetTop = this.$refs.TabControl.$el.offsetTop);
      //   this.isLoad = true
      // }
      
    },
    methods:{
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType ='pop'
            break;
          case 1:
            this.currentType ='new'
            break;
          case 2:
            this.currentType ='sell'
            break;
        }
        console.log(index);

        this.$refs.TabControl1.currentIndex = index;
        this.$refs.TabControl2.currentIndex = index;
      },

      backClick() {
        this.$refs.scroll.scrollTo(0,0,)
      },

      contentScroll(position) {
          this.isShow = (-position.y) > 1000
          this.isTabFixed = (-position.y) > this.taboffsetTop
      },

      loadmore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        this.taboffsetTop = this.$refs.TabControl2.$el.offsetTop
      }
    },
    computed:{
      shouGoods(){
       return this.goods[this.currentType].list;
      }
    }
  }
</script>

<style scoped>
   #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
    
  }

  .home-nav {
    background-color:var(--color-tint);
    color: #fff;

    /* 在使用原生的滚动的时候，防止导航跟着一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

.content {
      overflow: hidden;

      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
  }

  /* .content {
    height: calc(100%-93px) ;
    overflow: hidden;
    margin-top: 44px ;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
