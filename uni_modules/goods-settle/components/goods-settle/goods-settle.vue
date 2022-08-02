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
    <view class="settle-button" @click="buyGoods()">
      结算({{ checkedTotal }})
    </view>
  </view>
</template>
<script>
  import { mapState,mapGetters,mapMutations } from 'vuex'
  export default{
    data(){
      return{
        seconds: 3, // 倒计时
        timer: null // 定时器
      }
    },
    methods:{
      ...mapMutations('cart',['selectAllGoods']),
      selectAll(){
        this.selectAllGoods(!this.checkAll)
      },
      buyGoods(){
        if(!this.checkedTotal) return uni.$showMessage('请选中需要结算的商品')
        if(JSON.stringify(this.address) === '{}') return uni.$showMessage('请选择收货地址')
        // if(!this.token) return uni.$showMessage('请您先登录')
        if(!this.token) return this.delayGotoLogin()
      },
      // 延迟跳转登录页面
      delayGotoLogin(){
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(()=>{
          this.seconds--
          if(this.seconds <= 0){
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my'
            })
            return
          }
          this.showTips(this.seconds)
        },1000)
      },
      // 未登录提示信息
      showTips(seconds){
        uni.showToast({
          icon: 'none',
          title: '请登录后再进行结算，' + seconds + '秒后自动跳转到登录页',
          mask: true,
          duration: 1500
        })
      }
    },
    computed:{
      ...mapGetters('cart',['checkedTotal','goodsTotal','checkedGoodsPrice']),
      ...mapState('address',['address']),
      ...mapGetters('address',['addressInfo']),
      ...mapState('user',['token']),
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
