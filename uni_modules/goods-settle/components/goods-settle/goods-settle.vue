<template>
  <view class="goods-settle">
    <!-- 全选 -->
    <label class="radio" @click="selectAll()">
      <radio color="#c00000" :checked="checkAll"></radio>
      <text class="radio-text">全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-sum">
      合计：<text class="amount-text">￥{{ checkedGoodsPrice }}</text>
    </view>
    <!-- 结算 -->
    <view class="settle-button">
      结算({{ checkedTotal }})
    </view>
  </view>
</template>
<script>
  import { mapGetters,mapMutations } from 'vuex'
  export default{
    data(){
      return{
        
      }
    },
    methods:{
      ...mapMutations('cart',['selectAllGoods']),
      selectAll(){
        this.selectAllGoods(!this.checkAll)
      }
    },
    computed:{
      ...mapGetters('cart',['checkedTotal','goodsTotal','checkedGoodsPrice']),
      checkAll(){
        // 判断购物车商品和选中商品数是否一致
        return this.checkedTotal === this.goodsTotal
      }
    }
  }
</script>
<style lang="scss">
  .goods-settle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 16rpx;
    z-index: 999;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    .radio{
      display: flex;
      align-items: center;
      .radio-text{
        margin-left: 4px;
      }
    }
    .amount-sum{
      .amount-text{
        color: #c00000;
        font-weight: bold;
      }
    }
    .settle-button{
      width: 200rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      background-color: #c00000;
      color: #fff;
    }
  }
</style>
