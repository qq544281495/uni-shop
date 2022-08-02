<template>
  <view class="user-info">
    <!-- 用户头像、用户名区域 -->
    <view class="info-show">
      <image :src="userInfo.avatarUrl" class="info-image"></image>
      <view class="nick-name">{{ userInfo.nickName }}</view>
    </view>
    <!-- 用户收藏关注信息区域 -->
    <view class="info-collect">
      <view class="collect-item">
       <text>8</text> 
       <text>收藏的店铺</text> 
      </view>
      <view class="collect-item">
       <text>14</text> 
       <text>收藏的商品</text> 
      </view>
      <view class="collect-item">
       <text>18</text> 
       <text>关注的商品</text> 
      </view>
      <view class="collect-item">
       <text>84</text> 
       <text>足迹</text> 
      </view>
    </view>
    <!-- 用户订单区域 -->
    <view class="user-order">
      <view class="order-title">
        我的订单
      </view>
      <view class="order-box">
        <view class="order-item">
          <image src="/static/order-icon1.png"></image>
          <text>待付款</text>
        </view>
        <view class="order-item">
          <image src="/static/order-icon2.png"></image>
          <text>待发货</text>
        </view>
        <view class="order-item">
          <image src="/static/order-icon3.png"></image>
          <text>退款/退货</text>
        </view>
        <view class="order-item">
          <image src="/static/order-icon4.png"></image>
          <text>全部订单</text>
        </view>
      </view>
    </view>
    <!-- 用户相关操作 -->
    <view class="user-about">
      <view class="about-item">
        <text>收货地址</text>
        <uni-icons type="arrowright" size="15"></uni-icons>
      </view>
      <view class="about-item">
        <text>联系客服</text>
        <uni-icons type="arrowright" size="15"></uni-icons>
      </view>
      <view class="about-item" @click="outLogin">
        <text>退出登录</text>
        <uni-icons type="arrowright" size="15"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { mapState } from 'vuex'
  export default{
    data(){
      return{
        
      }
    },
    methods:{
      ...mapMutations('user',['updateUserInfo','updateToken']),
      ...mapMutations('address',['updateAddress']),
      async outLogin(){
        const [error,success] = await uni.showModal({
          title: '退出登录提示',
          content: '确定要退出登录吗？'
        }).catch(error => error)
        if(success && success.confirm){
          // 用户确定退出登录清除用户信息
          this.updateUserInfo({})
          this.updateToken('')
          this.updateAddress({})
        }
      }
    },
    computed:{
      ...mapState('user',['token','userInfo','address'])
    }
  }
</script>
<style lang="scss">
  .user-info{
    height: 100%;
    .info-show{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400rpx;
      background-color: #c00000;
      .info-image{
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        box-shadow: 0 1px 5px black;
      }
      .nick-name{
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
        color: #fff;
        letter-spacing: 2px;
      }
    }
    .info-collect{
      position: relative;
      top: -10px;
      background-color: #fff;
      display: flex;
      justify-content: space-evenly;
      margin: 0px 10px;
      box-shadow: 0px 0px 4px #888;
      .collect-item{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        padding: 10px 0px;
        font-size: 14px;
      }
    }
    .user-order{
      box-sizing: border-box;
      padding: 20rpx;
      margin: 5px 10px;
      box-shadow: 0px 0px 4px #888;
      background-color: #fff;
      .order-title{
        font-size: 16px;
        font-weight: bold;
      }
      .order-box{
        display: flex;
        justify-content: space-around;
        .order-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          image{
            display: block;
            width: 35px;
            height: 35px;
            margin: 10px 0px;
          }
        }
      }
    }
    .user-about{
      margin: 10px;
      box-shadow: 0px 0px 4px #888;
      background-color: #fff;
      .about-item{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 10px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #cfcfcf;
      }
    }
  }
</style>
