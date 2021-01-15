<template>
  <div class="container pa-0">
    <TagBar :tags="tags"/>
    <p class="font-italic font-weight-light mt-5">Latest Blog</p>
    <div class="blog_container mt-3">
      <v-row>
        <v-col cols="12" md="4" v-for="(item, index) in articles" :key="index">
          <BlogCard :blog="item" :postView=" state == 'loaded' ? modified[item.postId] : 0"/> 
    <!-- <pre>{{getView(item.postId)}}</pre> -->

        </v-col>  
      </v-row>
    </div>
  </div>
</template>

<script>
import TagBar from '@/components/TagBar.vue'
import BlogCard from '@/components/BlogCard.vue'
import View from '@/api/services/View.js'

export default {
  components: {
    TagBar,
    BlogCard
  },
  data() {
    return {
      blogView: [],
      modified: [],
      state: ''    }
  },
  methods: {
    getView() {
      this.blogView.forEach(element =>{
        this.modified[element.post_id] = element.post_view
      })

      if(this.modified.length){
        this.state = 'loaded'
      }
    }
  },
     async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author','postId'])
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

  created() {
  
    View.getAllViews().then(({data}) => this.blogView = data).then(() => {
    this.getView()

    }).catch(err => {
      console.log(err)
    })
    
  }
}
</script>


