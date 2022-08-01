export default{
  // 开启命名空间
  namespaced: true,
  state: ()=>({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  mutations:{
    updateAddress(state,address){
      state.address = address
      this.commit('address/saveAddressInfo')
    },
    // 将收货地址存储到本地缓存
    saveAddressInfo(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters: {
    addressInfo(state){
      if(JSON.stringify(state.address) === '{}' || !state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}