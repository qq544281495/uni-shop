<template>
  <view>
    <view class="cate-box">
      <!-- 左侧滚动栏 -->
        <scroll-view class="left-scroll" scroll-y="true" :style="{ height: scrollHeight + 'px' }">
          <block v-for="(item,index) in cateList" :key=" index">
            <view :class="['left-scroll-item', index === active ? 'active' : '']" @click="changeActive(index)">{{ item.cat_name }}</view>
          </block>
        </scroll-view>
        <!-- 右侧滚动栏 -->
        <scroll-view class="right-scroll" scroll-y="true" :style="{ height: scrollHeight + 'px' }" :scroll-top="scrollTop">
          <block v-for="(item,index) in secondCate" :key="index">
            <!-- 二级分类标题 -->
            <view class="second-title">{{ item.cat_name }}</view>
            <!-- 二级分类商品 -->
            <view class="second-goods">
              <view class="goods-item" v-for="(goodsItem,goodsIndex) in item.children" :key="goodsIndex" @click="gotoGoodsList(goodsItem.cat_id)">
                <image :src="goodsItem.cat_icon"></image>
                <view class="goods-name">{{ goodsItem.cat_name }}</view>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollHeight: 0,
        cateList: [],  // 分类数据
        secondCate: [],  // 二级分类
        active: 0,  // 当前分类索引
        scrollTop: 0 // 右侧滚动栏滚动距离
      };
    },
    onLoad() {
      // 获取系统信息
      const info = uni.getSystemInfoSync()
      this.scrollHeight = info.screenHeight
      this.getCateList()
    },
    methods:{
      // 获取分类数据
      async getCateList(){
        const { data : res } = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMessage()
        this.cateList = res.message
        this.secondCate = res.message[0].children
        console.log(this.secondCate);
      },
      // 切换当前分类
      changeActive(index){
        this.active = index
        this.secondCate = this.cateList[index].children
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      // 点击右侧滚动栏中次级分类跳转对应分类
      gotoGoodsList(index){
        uni.navigateTo({
          url: '/subpack/goods_list/goods_list?cateId=' + index
        })
      }
    }
  }
</script>

<style lang="scss">
  .cate-box{
    display: flex;
    .left-scroll{
      width: 240rpx;
      .left-scroll-item{
        background-color: #f7f7f7;
        line-height: 100rpx;
        text-align: center;
        font-size: 12px;
        &.active{
          position: relative;
          background-color: #ffffff;
        }
        &.active::before{
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          display: block;
          width: 4rpx;
          height: 50rpx;
          background-color: #c00000;
        }
      }
    }
    .right-scroll{
      .second-title{
        font-size: 18px;
        text-align: center;
        margin: 20rpx 0rpx 10rpx;
      }
      .second-goods{
        display: flex;
        flex-wrap: wrap;
        .goods-item{
          width: 33%;
          text-align: center;
          margin: 10rpx 0rpx;
          image{
            width: 120rpx;
            height: 120rpx;
          }
        }
      }
    }
  }
</style>
