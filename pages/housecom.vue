<template lang='pug'>
  .test
    .title 03. Housecom
    .lottie(ref='lottie')
</template>

<script>
import lottie from 'lottie-web'

export default {
  mounted () {
    lottie.loadAnimation({
      container: this.$refs.lottie,
      renderer: 'svg',
      loop: true,
      path: '/json/housecom.json'
    }).play()
  },
  head: {
    title: 'Home',
    meta: [
      { property: 'og:title', content: 'Home | Nitta.Studio🖕🏻' },
      { property: 'og:url', content: 'https://nitta.studio/' },
      { property: 'twitter:title', content: 'Home | Nitta.Studio🖕🏻' }
    ]
  }
}
</script>

<style lang='stylus' scoped>
.test
  .title
    font-size 18px
    font-weight bold
    +large()
      font-size 30px
  .lottie
    margin 50px auto 0
    width 80%
    height auto
</style>
