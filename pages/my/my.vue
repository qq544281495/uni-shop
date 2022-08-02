<template>
  <view class="my">
    <user-info v-if="userInfo"></user-info>
    <not-login v-else></not-login>
  </view>
</template>

<script>
  import tabberCart from '@/mixins/tabber-cart.js'
  import { mapState } from 'vuex'
  export default {
    mixins: [tabberCart],
    data() {
      return {
        
      }
    },
    methods:{
      
    },
    computed:{
      ...mapState('user',['token','userInfo','address'])
    }
  }
</script>

<style lang="scss">
  .my{
    
  }
</style>
