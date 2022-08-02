<template>
  <view class="cart">
    <block v-if="cart_info.length !== 0">
      <!-- 收货地址 -->
      <take-address></take-address>
      <!-- 购物车列表标题 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="title-text">购物车</text>
      </view>
      <!-- 购物车商品列表 -->
      <uni-swipe-action>
        <block v-for="(item,index) in cart_info" :key="index">
          <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
          <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
            <goods-item :goodsInfo="item" :showRadio="true" :showNumberBox="true" @radioChange="radioChange()" @changeGoodsNumber="changeGoodsNumber()"></goods-item>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 结算组件 -->
      <goods-settle></goods-settle>
    </block>
    <view class="cart-empty" v-else>
      <image src="/static/cart-empty.png" class="empty-image"></image>
      <text class="empty-text">您的购物车空空如也~</text>
    </view>
  </view>
</template>

<script>
  import tabberCart from '@/mixins/tabber-cart.js'
  import { mapState , mapMutations } from 'vuex'
  export default {
    mixins: [tabberCart],
    data() {
      return {
        options:[
          {
            text: '删除',
            style: {
              backgroundColor: '#c00000'
            }
          }
        ]
      }
    },
    methods: {
      ...mapMutations('cart',['updateCart','changeCartNumber','deleteCartGoods']),
      // 改变商品选中状态
      radioChange(value){
        this.updateCart(value)
      },
      // 改变商品数量
      changeGoodsNumber(value){
        this.changeCartNumber(value)
      },
      // 滑动删除事件
      swipeActionClickHandler(goods){
        this.deleteCartGoods(goods)
      }
    },
    computed: {
      ...mapState('cart',['cart_info'])
    }
  }
</script>

<style lang="scss">
  .cart{
    padding-bottom: 100rpx;
    .cart-title{
      display: flex;
      align-items: center;
      height: 80rpx;
      padding-left: 20rpx;
      border-bottom: 1px solid #efefef;
      font-size: 14px;
      .title-text{
        margin-left: 10rpx;
      }
    }
  }
  .cart-empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 100rpx 40rpx;
    .empty-text{
      font-size: 18px;
      letter-spacing: 4rpx;
      color: #888888;
    }
  }
</style>
