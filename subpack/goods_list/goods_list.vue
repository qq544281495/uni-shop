<template>
  <view>
    {{ query }}
    {{ cateId }}
  </view>
</template>

<script>
  export default {
    data() {
      return {
        query: '',
        cateId: ''
      };
    },
    onLoad(options) {
      this.query = options.query
      this.cateId = options.cateId
    }
  }
</script>

<style lang="scss">

</style>
