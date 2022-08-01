// 导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车模块
import cartModule from './cart.js'
// 导入收货地址模块
import addressModule from './address.js'
// 使用Vuex
Vue.use(Vuex)
// 创建store实例对象
const store = new Vuex.Store({
  modules: {
    cart: cartModule,
    address: addressModule
  }
})
// 导出store实例对象
export default store