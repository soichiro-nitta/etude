<template lang="pug">
  .default
    #scrollArea
      nuxt
</template>

<script>
export default {
  mounted() {
    const progress = document.getElementsByClassName('nuxt-progress')[0]
    progress.style.height = this.$device.isMobile ? '10px' : '20px'
    console.log('習作が秀作!?')
  }
}
</script>

<style lang="stylus" scoped>
.default
  position relative
  margin 10px
  width calc(100% - 20px)
  height calc(100% - 20px)
  overflow hidden
  #scrollArea
    position relative
    width 100%
    height 100%
    overflow-x hidden
    overflow-y scroll
    -webkit-overflow-scrolling touch
    -webkit-backface-visibility hidden
    background #191919
    backface-visibility hidden
    z-index 0
  #scrollArea>div
    margin 50px 0
    padding 0 30px
</style>
