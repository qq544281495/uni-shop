export default{
  namespaced: true, // 开启命名空间
  // 存储数据
  state: () => ({
    cart_info: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  // mutations方法
  mutations: {
    // 添加购物车方法
    addCart(state,goods){
      // 判断购物车中是否存在该商品
      const existJudg = state.cart_info.find(item=> item.goods_id === goods.goods_id)
      // 存在这该商品数量+1，不存在则加入购物车
      if(existJudg){
        existJudg.goods_count++
      }else{
        state.cart_info.push(goods)
      }
      this.commit('cart/saveCartInfo')
    },
    // 改变购物车选中商品
    updateCart(state,goods){
      const existJudg = state.cart_info.find(item => item.goods_id === goods.goods_id)
      if(existJudg){
        // 改变商品选中状态
        existJudg.goods_state = goods.goods_state
        this.commit('cart/saveCartInfo')
      }
    },
    // 改变购物车商品数量
    changeCartNumber(state,goods){
      const existJudg = state.cart_info.find(item => item.goods_id === goods.goods_id)
      if(existJudg){
        existJudg.goods_count = goods.goods_count
        this.commit('cart/saveCartInfo')
      }
    },
    // 删除购物车商品
    deleteCartGoods(state,goods){
      state.cart_info = state.cart_info.filter(item => item.goods_id !== goods.goods_id)
      this.commit('cart/saveCartInfo')
    },
    // 商品全选
    selectAllGoods(state, goodsState){
      state.cart_info.forEach(item => item.goods_state = goodsState)
      this.commit('cart/saveCartInfo')
    },
    // 将购物车信息存储到本地
    saveCartInfo(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart_info))
    },
  },
  // getters属性
  getters: {
    // 购物车商品总数
    goodsTotal(state){
      let sum = 0
      state.cart_info.forEach(item=>{
        sum += item.goods_count
      })
      return sum
    },
    // 选中商品总数
    checkedTotal(state){
      return state.cart_info.filter(item => item.goods_state).reduce((total,item) => total += item.goods_count,0)
    },
    // 计算选中商品价格
    checkedGoodsPrice(state){
      return state.cart_info.filter(item => item.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
    }
  }
}