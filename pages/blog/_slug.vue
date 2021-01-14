<template>
  <div class="mt-5">
    <div class="d-flex justify-center">
      <img :src="article.img" alt="" class="blog_view_image">

    </div>
        <BlogHeader :blog_title="article.title" class="mt-4" :slugs="tagsList" :url="url" :blog_created_time="article.date ? article.date : ''"/>
              <nuxt-content :document="article" />
              <PreNext :prev="prev" :next="next"/>
      <AuthorInfo :author="author"/>

  </div>
</template>

<script>
import BlogHeader from '@/components/general/BlogHeader.vue'
import PreNext from '@/components/general/PreNext.vue'
import AuthorInfo from '@/components/AuthorInfo.vue'
export default {
    
    components: {
        BlogHeader,
        PreNext,
        AuthorInfo
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

      const { author } = article
    return {
        tagsList,
        author,
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
  max-width: 100%;
    /* width: 70%; */
    max-height: 400px;
}
img { max-width: 100%; }
</style>