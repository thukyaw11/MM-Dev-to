<template>
  <div class="container">
      <AuthorInfo :author="author"/>
    <h3 class="my-5"># {{uppercase($route.params.author)}}</h3>
        <div class="blog_container mt-3">
      <v-row v-if="articles.length">
        <v-col cols="12" md="4" v-for="(item, index) in articles" :key="index">
          <BlogCard :blog="item"/> 
        </v-col>  
      </v-row>
      <div v-else>No blog belonging to {{$route.params.author}}</div>
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import AuthorInfo from '@/components/AuthorInfo.vue'
export default {
    components: {
        BlogCard,
        AuthorInfo
    },
    async asyncData({ $content, params }) {
        const articles = await $content('articles', params.slug)
      .where({
        'author.name': {
          $regex: [params.author, 'i']
        }
      })
      .without('description')
      .sortBy('createdAt', 'asc')
      .fetch()


      const { author } = articles[0]

      return {
          articles,
          author
      }
},
 head() {
      return {
        title: this.uppercase(this.$route.params.author),
        meta: [
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
        console.log(value)
        return value.toUpperCase();
    }
}

}
</script>