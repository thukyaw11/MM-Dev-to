<template>
  <div class="container">
    <h3 class="my-5"># {{uppercase(tag.name)}}</h3>
        <div class="blog_container mt-3">
      <v-row v-if="articles.length">
        <v-col cols="12" md="4" v-for="(item, index) in articles" :key="index">
          <BlogCard :blog="item"/> 
        </v-col>  
      </v-row>
      <div v-else>No blog belonging to {{tag.name}}</div>
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
export default {
    components: {
        BlogCard
    },
    async asyncData({ $content, params }) {
    const tags = await $content('tags')
      .where({ slug: { $contains: params.tag } })
      .limit(1)
      .fetch()
    const tag = tags.length > 0 ? tags[0] : {}
    const articles = await $content('articles', params.slug)
      .where({ tags: { $contains: tag.name } })
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tag
    }
},
 head() {
      return {
        title: this.tag.name,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    },
methods : {
    uppercase(value) {
        return value.toUpperCase();
    }
}
}
</script>