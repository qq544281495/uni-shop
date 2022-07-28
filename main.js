import App from './App'
// 按需导入$http对象
import { $http } from '@escook/request-miniprogram'
// 将$http挂载到uni对象上
uni.$http = $http
// 设置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求前处理事务
$http.beforeRequest = function(options){
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 请求完成后处理事物
$http.afterRequest = function(){
  uni.hideLoading()
}

// 封装提示信息
uni.$showMessage = function(title = '数据加载失败', duration = 1000){
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif