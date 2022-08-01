<template>
  <!-- 判断是否获取到商品信息 -->
  <view class="goods-detail" v-if="goods_info.goods_name">
    <!-- 商品轮播图 -->
    <swiper class="goods-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="showImage(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品基础信息渲染区域 -->
    <view class="goods-info">
      <!-- 商品价格 -->
      <view class="goods-price">
        ￥{{ goods_info.goods_price }}
      </view>
      <!-- 商品名及收藏 -->
      <view class="info-box">
        <view class="goods-name">
          {{ goods_info.goods_name }}
        </view>
        <view class="goods-collect">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 商品运费信息 -->
      <view class="goods-freight">
        快递：免运费
      </view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState , mapMutations , mapGetters  } from 'vuex'
  export default {
    data() {
      return {
        goods_info: {},
        // 商品导航组件配置信息
        options: [
          {
            icon: 'shop',
            text: '店铺'
          },
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        // 商品导航组件按钮配置信息
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    computed: {
      ...mapState('cart',['cart_info']),
      ...mapGetters('cart', ['goodsTotal'])
    },
    watch: {
      goodsTotal: {
        handler(value){
          const findResult = this.options.find( item => item.text === '购物车')
          if(findResult){
            findResult.info = value
          }
        },
        // 页面加载时立即调用一次
        immediate: true
      }
    },
    methods: {
      ...mapMutations('cart', ['addCart']),
      // 获取商品详情数据
      async getGoodsDetail(goods_id){
        const { data : res } = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        if(res.meta.status !== 200) return uni.$showMessage()
        // 正则匹配商品详情中的ima标签改为块级元素同时将webp后缀图片改为jpg
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      // 点击图片进入预览模式
      showImage(index){
        uni.previewImage({
          current: index, // 进入图片预览模式显示图片索引
          urls: this.goods_info.pics.map( item => item.pics_big )
        })
      },
      onClick (e) {
        if(e.content.text === '购物车'){
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick (e) {
      	if(e.content.text === '加入购物车'){
          // 组件商品信息对象
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品id
            goods_name: this.goods_info.goods_name, // 商品名
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 是否选中商品  
          }
          // 添加购物车
          this.addCart(goods)
        }
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
  }
</script>

<style lang="scss">
  .goods-detail{
    padding-bottom: 10px;
    // 轮播图
    .goods-swiper{
      width: 100%;
      height: 750rpx;
      image{
        width: 100%;
        height: 100%;
      }
    }
    // 商品基础信息区域
    .goods-info{
      box-sizing: border-box;
      padding: 20rpx 10rpx;
      .goods-price{
        font-size: 18px;
        font-weight: bold;
        color: #c00000;
      }
      .info-box{
        display: flex;
        margin: 10rpx 0rpx;
        .goods-name{
          flex: 1;
          box-sizing: border-box;
          padding-right: 20rpx;
          font-size: 14px;
          line-height: 24px;
        }
        .goods-collect{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 180rpx;
          border-left: 1px solid #cfcfcf;
          color: gray;
        }
      }
      .goods-freight{
        font-size: 12px;
        color: gray;
      }
    }
    .goods-nav{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
