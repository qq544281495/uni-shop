import { mapGetters } from 'vuex'
export default{
  computed: {
    ...mapGetters('cart', ['goodsTotal'])
  },
  onShow(){
    // 页面展示时设置购物车数字徽标
    this.showCartNumber(this.goodsTotal)
  },
  methods: {
    showCartNumber(){
      uni.setTabBarBadge({
        index: 2, // tabBar索引
        text: this.goodsTotal + ''
      })
    }
  },
  watch: {
    goodsTotal: function(value){
      this.showCartNumber(value)
    }
  }
}