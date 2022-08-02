export default{
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
  }),
  mutations: {
    updateUserInfo(state,userInfo){
      state.userInfo = userInfo
      this.commit('user/saveUserInfo')
    },
    updateToken(state,token){
      state.token = token
      this.commit('user/saveToken')
    },
    saveUserInfo(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    saveToken(state){
      uni.setStorageSync('token',JSON.stringify(state.token))
    }
  },
  getters: {
    
  }
}