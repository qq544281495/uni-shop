<template>
  <view>
    <!-- 首页搜索 -->
    <view class="home-search">
      <goods-search @searchGoods="searchGoods"></goods-search>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="'/subpack/goods_detail/goods_detail?goods_id=' + item.goods_id">
              <!-- 动态绑定图片的 src 属性 -->
              <image class="swiper-image" :src="item.image_src"></image>
            </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航栏 -->
    <view class="nav">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image class="nav-image" :src="item.image_src"></image>
      </view>
    </view>
    <!-- 首页精选列表 -->
    <view class="floor">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image class="item-image" :src="item.floor_title.image_src"></image>
        <view class="item-box">
          <image class="title-image" :src="item.product_list[0].image_src" @click="gotoGoodsList(item.product_list[0])"></image>
          <view class="image-box">
            <image @click="gotoGoodsList(item1)" :src="item1.image_src" v-for="(item1,index1) in item.product_list" :key="index1" v-if="index1 !== 0"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import tabberCart from '@/mixins/tabber-cart.js'
  export default {
    mixins: [tabberCart],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取首页轮播图
      async getSwiperList(){
        const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status !== 200) return uni.$showMessage()
        this.swiperList = res.message
      },
      // 获取分类导航
      async getNavList(){
        const { data : res } = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200) return uni.$showMessage()
        this.navList = res.message
      },
      // 分类导航点击“分类”跳转到分类页面
      navClickHandler(item){
        if(item.name === '分类'){
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取首页列表数据
      async getFloorList(){
        const { data : res } = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMessage()
        res.message.forEach(floor => {
          floor.product_list.forEach(item => {
            item.url = '/subpack/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 首页跳转到商品列表页
      gotoGoodsList(item){
        uni.navigateTo({
          url: item.url
        })
      },
      // 点击搜索组件跳转搜索页
      searchGoods(){
        uni.navigateTo({
          url: '/subpack/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  // 首页搜索
  .home-search{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  // 轮播图样式
  swiper{
    height: 330 rpx;
    .swiper-item,.swiper-image{
      width: 100%;
      height: 100%;
    }
  }
  // 分类导航栏样式
  .nav{
    display: flex;
    width: 100%;
    height: 200rpx;
    .nav-item{
      flex: 1;
      padding: 20rpx;
      .nav-image{
        width: 100%;
        height: 100%;
      }
    }
  }
  // 首页精选分类样式
  .floor{
    .floor-item{
      box-sizing: border-box;
      padding: 10rpx;
      .item-image{
        display: block;
        width: 100%;
        height: 100rpx;
      }
      .item-box{
        display: flex;
        .title-image{
          width: 256rpx;
          height: 400rpx;
        }
        .image-box{
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          image{
            display: block;
            box-sizing: border-box;
            padding: 4rpx;
            width: 50%;
            height: auto;
          }
        }
      }
    }
  }
</style>
