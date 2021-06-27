<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" 
    :pull-up-load="true" 
    :probe-type='3' 
    ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad"  />
      <detail-param-info :param-info="goodsParams" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo" />
      <good-list :goods="recommend" ref="recommend" />
    </scroll>
  </div>
</template>

<script>

  //引用Detail的子组件
  import DetailNavBar from './chidDetail/DetailNavBar'
  import DetailSwiper from './chidDetail/DetailSwiper'
  import DetailBaseInfo from './chidDetail/DetailBaseInfo'
  import DetailShopInfo from './chidDetail/DetailShopInfo'
  import DetailImagesInfo from './chidDetail/DetailImagesInfo'
  import DetailParamInfo from './chidDetail/DetailParamInfo'
  import DetailCommentInfo from './chidDetail/DetailCommentInfo'

  //引用当前项目公用的组件
  import GoodList from 'components/content/goods/GoodList'

  //引用better-scroll
  import Scroll from 'components/common/scroll/Scroll'
 
  //引用网络请求
  import {getDetail , Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

  //引用混入js文件
  import { itemListMixin } from  'common/mixin'

  import { debounce } from 'common/utils'


export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
  },
  mixins: [itemListMixin],
  data() {
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop: {},
      detailsInfo:{},
      goodsParams:{},
      commentInfo:{},
      recommend:[],
      themeTopYs: [],
      getThemeTopYs:null
      
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    this.getDetail();
    this.getRecommend();

    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
     }, 100)
    
  },
  updated(){

  },
  methods:{
    // 2.根据iid请求详情数据
    getDetail() {
      getDetail(this.iid).then(res => {
        // console.log(res)
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
    
        // 2.获取商品信息,调用封装的ES6的class
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.获取店铺信息的对象
        this.shop = new Shop(data.shopInfo);
        // 4.获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;
        // 5.获取商品参数的数据
        this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule || {})
        // 6.获取评论数据
        this.commentInfo = data.rate.list[0] || {};

      })
    },
      
    getRecommend() {
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })
    },

    imgLoad() {
      this.$refs.scroll.scroll.refresh()
      // console.log('-----');
      this.getThemeTopYs();
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      console.log(this.themeTopYs[index]);
    }
  }
}
</script>

<style scoped> 
  #detail {
    position: relative;
    z-index: 16;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* height: calc(100% - 44px);
     overflow: hidden; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>