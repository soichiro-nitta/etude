<template lang='pug'>
  .test
    .title 02. test
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
      path: '/json/test.json'
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
    margin-left -80%
    width 260%
    height auto
    +large()
      margin 0 auto
      width 80%
</style>
