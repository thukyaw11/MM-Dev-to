<template>
  <div class="container">
    <div class="d-flex justify-space-between">
    <h3 class="my-5"># {{uppercase(tag.name)}}</h3>

      <ShareNetwork
    network="facebook"
    :url="url"
    :title="tag.name"
    :description="tag.description"
    :quote="tag.description"
    hashtags="mmdev_to"
    style="text-decoration: none"
  >
    <Button button_text="Share"/>
</ShareNetwork>
    </div>
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
        title: this.title,
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
methods : {
    uppercase(value) {
        return value.toUpperCase();
    },
},
    computed: {
      title() {
        if(this.tag) return this.tag.name
        return 'Tag Name'
      },
      description() {
        if(this.tag) return this.tag.description
        return 'Description'
      },
      url () {
            return 'https://dev-to-mm.netlify.app' + this.$route.fullPath
      },
      img() {
        if(this.tag) return `https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F08%2Fed%2F3a%2F08ed3a37713c50fe0eeeb4b78dd00096.jpg&text=${this.uppercase(this.tag.name)}&text_size=128&margin=1&y_align=middle&x_align=center`
      }
    }
}
</script>