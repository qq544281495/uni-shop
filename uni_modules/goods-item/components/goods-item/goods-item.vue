<template>
  <view class="goods-item">
    <view class="goods-image">
      <image :src="goodsInfo.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-info">
      <view class="goods-name">{{ goodsInfo.goods_name }}</view>
      <view class="goods-price">￥ {{ goodsInfo.goods_price | priceFilter }}</view>
    </view>
  </view>
</template>
<script>
  export default{
    props: {
      goodsInfo: {
        type: Object,
        default: {}
      }
    },
    data(){
      return{
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png', // 默认空图片（防止部分图片缺失或加载失败）
      }
    },
    filters: {
      // 价格过滤器
      priceFilter(value){
        return Number(value).toFixed(2)
      }
    },
  }
</script>
<style lang="scss">
    .goods-item{
      display: flex;
      box-sizing: border-box;
      padding: 8px;
      border-bottom: 1px solid #cfcfcf;
      .goods-image{
        width: 300rpx;
        height: 240rpx;
        image{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .goods-info{
        flex: 1;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
        padding: 0px 6px;
        .goods-name{
          font-size: 14px;
          line-height: 24px;
        }
        .goods-price{
          color: #c00000;
        }
      }
    }
</style>
