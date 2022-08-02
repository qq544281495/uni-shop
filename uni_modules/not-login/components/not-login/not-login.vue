<template>
  <view class="not-login">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default{
    data(){
      return{
        
      }
    },
    methods:{
      ...mapMutations('user',['updateUserInfo','updateToken']),
      getUserInfo(event){
        if(event.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMessage('您取消了登录授权')
        this.updateUserInfo(event.detail.userInfo)
        // 获取token
        this.getToken(event.detail)
      },
      async getToken(info){
        // 调用微信登录接口
        const [error,success] = await uni.login().catch(error => error)
        if(error || success.errMsg !== 'login:ok') return uni.$showMessage('登录失败')
        // 组装参数对象
        const query = {
          code: success.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 获取token
        const {data : loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
        this.updateToken(loginResult.message.token)
      }
    },
    computed:{
      
    }
  }
</script>
<style lang="scss">
  .not-login{
    text-align: center;
    padding-top: 140rpx;
    .btn-login{
      margin: 20rpx 40rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 20px;
      background-color: #c00000;
      letter-spacing: 6rpx;
      font-size: 16px;
    }
    .tips-text{
      font-size: 14px;
      color: #888;
    }
  }
</style>
