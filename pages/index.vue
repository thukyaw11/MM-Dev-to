<template>
  <div class="container pa-0">
    <TagBar :tags="tags"/>
    <p class="font-italic font-weight-light mt-5">Latest Blog</p>
    <div class="blog_container mt-3">
      <v-row>
        <v-col cols="12" md="4" v-for="(item, index) in articles" :key="index">
          <BlogCard :blog="item"/> 
        </v-col>  
      </v-row>
    </div>
  </div>
</template>

<script>
import TagBar from '@/components/TagBar.vue'
import BlogCard from '@/components/BlogCard.vue'

export default {
  components: {
    TagBar,
    BlogCard
  },
     async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  },
}
</script>


