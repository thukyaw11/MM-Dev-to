<template>
  <div class="mt-5">
      <img :src="article.img" alt="" class="blog_view_image">
        <BlogHeader :blog_title="article.title" class="mt-4" :slugs="tagsList" :url="url"/>
              <nuxt-content :document="article" />
              <PreNext :prev="prev" :next="next"/>
  </div>
</template>

<script>
import BlogHeader from '@/components/general/BlogHeader.vue'
import PreNext from '@/components/general/PreNext.vue'
export default {
    
    components: {
        BlogHeader,
        PreNext
    },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch()
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
        tagsList,
      article,
      tags,
      prev,
      next
    }
  },
  computed:{
        title() {
            if(this.article) return this.article.title
            return 'Do pouk ka ya and enjoy life'
        },
        description() {
            if(this.article) return this.article.description
            return 'Myanmar Version of Dev.to'
        },
         url() {
            return 'https://dev-to-mm.netlify.app' + this.$route.fullPath
        },
        img() {
            if(this.article) return this.article.img
        }
  },
head() {
  return {
    title: this.article.title,
    meta: [
      {
        hid: 'description',
        content: this.description,
        name: 'description'
      },
      {
        hid: 'og:title',
        content: this.title,
        property: 'og:title'
      },
      {
        hid: 'og:description',
        content: this.description,
        property: 'og:description'
      },
      {
        hid: 'og:url',
        content: this.url,
        property: 'og:url'
      },
          {
        hid: 'og:image',
        content: this.img,
        property: 'og:image'
      }
    ]
  }
},
}
</script>

<style scoped>
.blog_view_image {
    width: 100%;
    height: 400px;
}

</style>