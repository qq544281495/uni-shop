<template>
  <view class="take-address">
    <!-- 未选择收货地址 -->
    <view class="none-address" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="none-button" @click="selectAddress()">请选择收货地址+</button>
    </view>
    <!-- 已选择收货地址 -->
    <view class="exist-address" v-else @click="selectAddress()">
      <!-- 用户信息 -->
      <view class="user-info">
        <view class="user-name">
          <view class="name">收货人：<text>{{ address.userName }}</text></view>
        </view>
        <view class="user-phone">
          <view class="phone">手机号：<text>{{ address.telNumber }}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <!-- 地址信息 -->
      <view class="address-info">
        <view class="hint">收货地址：</view>
        <view class="info">{{ addressInfo }}</view>
      </view>
    </view>
  </view>
</template>
<script>
  import { mapState, mapMutations, mapGetters} from 'vuex'
  export default{
    data(){
      return{
        
      }
    },
    methods:{
      ...mapMutations('address',['updateAddress']),
      // 选择收货地址
      async selectAddress(){
        const [error,success] = await uni.chooseAddress().catch(error=>error)
        if(error === null && success.errMsg === 'chooseAddress:ok'){
          this.updateAddress(success)
        }
        // 用户未授权
        if(error && (error.errMsg === 'chooseAddress:fail auth deny' || error.errMsg === 'chooseAddress:fail authorize no response')){
          this.userMandate()
        }
      },
      // 用户授权方法
      async userMandate(){
        const [error,confirResult] = await uni.showModal({
          content: '检测到您未授权位置权限，是否设置打开？',
          confirmText: "确认",
          cancelText: "取消"
        })
        // 异常则直接返回
        if(error) return
        // 用户取消位置授权提示
        if(confirResult.cancel) return uni.$showMessage('您已取消位置授权')
        // 用户同意授权位置权限
        if(confirResult.confirm) return uni.openSetting({
          success: (settingResult) => {
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      }
    },
    computed: {
      ...mapState('address',['address']),
      ...mapGetters('address',['addressInfo'])
    }
  }
</script>
<style lang="scss">
  .take-address{
    box-sizing: border-box;
    padding: 20rpx;
    border-bottom: 4px solid #c00000;
    width: 100%;
    height: 160rpx;
    .none-address{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .none-button{
        height: 70rpx;
        font-size: 16px;
        line-height: 70rpx;
      }
    }
    .exist-address{
      .user-info{
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        .user-phone{
          display: flex;
          .phone{
            margin-right: 6px;
          }
        }
      }
      .address-info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .hint{
          width: 80px;
          white-space: nowrap;
        }
        .info{
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
