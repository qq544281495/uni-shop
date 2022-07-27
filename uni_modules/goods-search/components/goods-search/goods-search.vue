<template>
  <view class="goods-search" :style="{ 'background-color': bgColor  }" @click="searchHandler">
    <view class="search-box" :style="{'border-radius': radius + 'px'}">
       <uni-icons type="search" size="17"></uni-icons>
       <text class="goods-placeholder">搜索</text>
    </view>
  </view>
</template>
<script>
  export default{
    props: {
      bgColor: {
        type: String,
        default: "#c00000"
      },
      radius: {
        type: Number,
        default: 20
      }
      
    },
    data(){
      return{
        
      }
    },
    methods: {
      searchHandler(){
        this.$emit('searchGoods')
      }
    }
  }
</script>
<style lang="scss">
  .goods-search{
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 5px 0px;
    text-align: center;
    .search-box{
      width: 100%;
      height: 100%;
      line-height: 30px;
      background-color: #ffffff;
      .goods-placeholder{
        margin-left: 4px;
      }
    }
  }
</style>
