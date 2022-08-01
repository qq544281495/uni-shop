<template>
  <view class="goods-item">
    <view class="goods-image">
      <radio v-if="showRadio" :checked="goodsInfo.goods_state" color="#c00000" @click="radioHandler()"></radio>
      <image :src="goodsInfo.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-info">
      <view class="goods-name">{{ goodsInfo.goods_name }}</view>
      <view class="goods-price">
        <text>￥ {{ goodsInfo.goods_price | priceFilter }}</text>
        <uni-number-box :min="1" v-if="showNumberBox" :value="goodsInfo.goods_count" @change="changeGoodsCount()"></uni-number-box>
      </view>
    </view>
  </view>
</template>
<script>
  export default{
    props: {
      goodsInfo: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNumberBox: {
        type: Boolean,
        default: false
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
    methods: {
      // 改变商品选中状态
      radioHandler(){
        this.$emit('radioChange',{
          goods_id: this.goodsInfo.goods_id,
          goods_state: !this.goodsInfo.goods_state
        })
      },
      // 修改购物车商品数量
      changeGoodsCount(value){
        this.$emit('changeGoodsNumber',{
          goods_id: this.goodsInfo.goods_id,
          goods_count: Number(value)
        })
      }
    }
  }
</script>
<style lang="scss">
    .goods-item{
      display: flex;
      box-sizing: border-box;
      padding: 8px;
      border-bottom: 1px solid #cfcfcf;
      .goods-image{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 10rpx;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #c00000;
        }
      }
    }
</style>
