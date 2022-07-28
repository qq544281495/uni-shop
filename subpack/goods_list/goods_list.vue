<template>
  <view class="goods-list">
    <view v-for="(item,index) in goodsList" :key="item.goods_id" @click="gotoGoodsDetail(item)">
      <goods-item :goodsInfo="item"></goods-item>
    </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObject: {
          query: '', // 查询关键字
          cateId: '', // 商品分类ID
          pagenum: 1, // 页码
          pagesize: 10 // 页展示数据量
        },
        goodsList: [], // 商品列表数据
        goodsTotal: 0, // 商品列数数据总量
        isLoading: false, // 上流加载节流阀
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png', // 默认空图片（防止部分图片缺失或加载失败）
      };
    },
    methods: {
      async getGoodsList(stop){
        // 加载商品数据时打开节流阀
        this.isLoading = true
        const { data : res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObject)
        // 加载完数据关闭节流阀
        this.isLoading = false
        // 请求完数据判断是否为下拉刷新是则调用回调函数停止下拉刷新效果
        stop && stop()
        if(res.meta.status !== 200) return uni.$showMessage()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.goodsTotal = res.message.total
      },
      // 点击商品列表信息跳转对应商品
      gotoGoodsDetail(item){
        uni.navigateTo({
          url: '/subpack/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onLoad(options) {
      this.queryObject.query = options.query || ''
      this.queryObject.cateId = options.cateId || ''
      // 获取商品列表数据
      this.getGoodsList()
    },
    // 上拉加载数据
    onReachBottom() {
      // 当全部数据加载完毕返回提示信息
      if(this.queryObject.pagenum * this.queryObject.pagesize >= this.goodsTotal) return uni.$showMessage('数据加载完毕~')
      // 当上拉加载数据时已有请求时返回
      if(this.isLoading) return
      this.queryObject.pagenum += 1
      this.getGoodsList()
    },
    // 下拉刷新数据
    onPullDownRefresh() {
      // 重置查询请求字段
      this.queryObject.pagenum = 1
      this.goodsList = []
      this.goodsTotal = 0
      this.isLoading = false
      // 重新请求商品数据并传入回调函数（加载完数据关闭下拉刷新效果）
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
  .goods-list{
    
  }
</style>
