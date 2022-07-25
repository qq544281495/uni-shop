<template>
  <view>
    {{ goods_id }}
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_id: 0
      };
    },
    onLoad(options) {
      this.goods_id = options.goods_id
    }
  }
</script>

<style lang="scss">

</style>
