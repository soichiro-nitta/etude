<template lang="pug">
  .id {{ id }}
</template>

<script>
export default {
  async asyncData ({params}) {
    // store.commit('_id/init')
    // await store.dispatch('_id/fetchArticle', {
    //   slug: params.id
    // })
    // await store.dispatch('_id/fetchRandom')
    // await store.dispatch('_id/fetchRanking')
    return {
      id: params.id
    }
  }
  // mounted () {
  //   document.getElementById('scrollArea').scrollTop = 0
  // },
  // head () {
  // return {
  //   title: this.article.title,
  //   meta: [
  //     { property: 'og:title', content: `${this.article.title} | LIBERTY GRAPH` },
  //     { property: 'og:url', content: `https://libertygraph.com/${this.article.slug}` },
  //     { property: 'og:image', content: this.article.src },
  //     { property: 'twitter:title', content: `${this.article.title} | LIBERTY GRAPH` },
  //     { property: 'twitter:image', content: this.article.src }
  //   ]
  // }
  // }
}
</script>

<style lang='stylus' scoped>
</style>
