<template>

<div class="d-flex justify-between my-3 mt-10 input-box align-center">
  <input class="search_container px-3 flex-grow-1" placeholder="Search" v-model="searchQuery"/>
  <span class="search_icon d-flex justify-center pr-5"> 
      <v-icon
      sm      
    >
      mdi-magnify
    </v-icon>

  </span>
  <div class="result_box_container">
 <ul v-if="articles.length" class="search_result_list">
      <li v-for="article of articles" :key="article.slug" class="search_result_list_li d-flex align-center" @click="gotoBlog(article)">
        {{article.title}}
      </li>
 </ul>
  </div>
</div>



</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: []
    }
  },
  methods: {
    gotoBlog(article){
      this.$router.push({name: 'blog-slug', params: { slug: article.slug }});
      this.searchQuery = ''
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = []
        return
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .fetch()
    }
  }
}
</script>

<style>
.input-box {
    width: 100%;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    position: relative;
}
.input-box .search_container {
    border: none;
    outline: none;
}
.search_icon {
    height: 100%;
}
.result_box_container {
  position: absolute;
  top: 110%;
  width: 100%;
  height: auto;
  background: rgb(224, 224, 224);
}
.search_result_list {
  list-style-type: none;
}
.link_text{
  color: black;
  text-decoration: none;
}
.search_result_list_li {
  height: 50px;
  width: 100%;
  cursor: pointer;
}
.search_result_list_li:hover {
  color: blue;
}
</style>