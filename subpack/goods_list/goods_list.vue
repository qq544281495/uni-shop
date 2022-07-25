<template>
  <view>
    {{ query }}
  </view>
</template>

<script>
  export default {
    data() {
      return {
        query: ''
      };
    },
    onLoad(options) {
      this.query = options.query
    }
  }
</script>

<style lang="scss">

</style>
