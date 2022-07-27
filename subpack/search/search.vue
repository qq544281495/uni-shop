<template>
  <view class="search">
    <!-- 搜索输入框 -->
    <view class="search-box">
      <uni-search-bar v-model="searchValue" @input="searchGoods" :radius="100" cancelButton="none" clearButton="auto"></uni-search-bar>
    </view>
    <!-- 搜索推荐商品展示 -->
    <view class="search-list" v-if="searchResults.length !== 0">
      <view class="search-item" v-for="(item,index) in searchResults" :key="index" @click="gotoGoodsDetail(item.goods_id)">
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history" v-else>
      <!-- 搜索历史标题及清除栏 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="18" @click="clearHistory()"></uni-icons>
      </view>
      <!-- 搜索历史展示栏 -->
      <view class="history-box">
        <view class="history-item" v-for="(item,index) in showHistory" :key="index" @click="gotoGoodsList(item)">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        searchValue: '',
        searchResults: [],
        historyList: ['测试','Demo']
      };
    },
    methods: {
      searchGoods(value){
        // 输入防抖
        // 清除定时器
        clearTimeout(this.timer)
        // 设置定时器（定时时间内没有再次输入将输入值赋值给搜索变量）
        this.timer = setTimeout(()=>{
          this.searchValue = value
          this.getSearchResults()
        },500)
      },
      async getSearchResults(){
        // 搜索关键字为空则返回空数据
        if(this.searchValue === ''){
          this.searchResults = []
          return
        }
        // 搜索关键字不为空发送请求
        const { data : res } = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.searchValue})
        if(res.meta.status !== 200) return uni.$showMessage()
        this.searchResults = res.message
        console.log(this.searchResults);
        // 获取到搜索商品数据后将搜素关键字添加到搜索历史中
        this.saveSearchHistory()
        if(this.searchResults.length === 0) return uni.$showMessage('未能找到您搜索的商品')
      },
      // 点击搜索推荐项跳转商品详情
      gotoGoodsDetail(goodsId){
        uni.navigateTo({
          url: '/subpack/goods_detail/goods_detail?goods_id=' + goodsId
        })
      },
      // 添加搜索历史
      saveSearchHistory(){
        const historySet = new Set(this.historyList)
        // 避免搜索历史重复值
        historySet.delete(this.searchValue)
        historySet.add(this.searchValue)
        this.historyList = Array.from(historySet)
        // 将搜索历史存储到本地
        uni.setStorageSync('history', JSON.stringify(this.historyList))
      },
      // 点击搜索历史查询跳转到商品列表
      gotoGoodsList(value){
        uni.navigateTo({
          url: '/subpack/goods_list/goods_list?query=' + value
        })
      },
      // 清除历史记录
      clearHistory(){
        this.historyList = []
        // 同时清除本地存储中的数据
        uni.setStorageSync('history','[]')
      }
    },
    computed:{
      showHistory(){
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      // 从本地存储中获取搜索历史
      this.historyList = JSON.parse(uni.getStorageSync('history') || '[]')
    }
  }
</script>

<style lang="scss">
  .search{
    .search-box{
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .search-list{
      .search-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 10px;
        border-bottom: 1px solid #cfcfcf;
        .goods-name{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 4px;
        }
      }
    }
    .search-history{
      .history-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15rpx 30rpx;
        border-bottom: 1px solid #cfcfcf;
      }
      .history-box{
        display: flex;
        flex-wrap: wrap;
        .history-item{
          background-color: #efefef;
          border-radius: 4px;
          font-size: 14px;
          margin: 8px;
          padding: 10rpx 20rpx;
        }
      }
    }
  }
</style>
