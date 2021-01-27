<template>
<NuxtLink :to="{name : 'blog-slug', params: {slug: blog.slug}}" style="text-decoration: none">
  <div class="blog_card_container">
      <div class="blog_img_container">
          <img class="blog_img" :src="blog.img"/>
      </div>

      <div class="author_container d-flex align-center py-3 pb-1 justify-space-between">
          <NuxtLink :to="`/blog/author/${blog.author.name}`" style="text-decoration: none; color: black;" class="d-flex align-center">

          <img class="author_img" :src="blog.author.img">
          <div class="author_name ml-3">{{blog.author.name}}</div>
          
          </NuxtLink>

          <div class="view text--secondary d-flex align-items-center">
              <img src="icons/view.png" alt="" class="view-img mr-3"> 
              <span>
              {{postView ? postView : '0'}}
              </span>
          </div>
      </div>
            <div class="info_container d-flex flex-column my-5 mx-2">
          <div class="title_custom">{{blog.title}}</div>
          <div class="body_custom text--secondary pt-2">
              {{blog.description}}
          </div>
      </div>
  </div>
</NuxtLink>
</template>

<script>
export default {
    props: {
        blog: { 
            type: Object
        },
        postView: {
            default: null
        }
    }
}
</script>

<style scoped>
.blog_card_container {
    height: 400px;
    width: 100%;
    background:#fff;
    cursor: pointer;
    
}
.blog_img_container {
    height: 60%;
    width: 100%;
    background: grey;
}
.blog_img {
    height: 100%;
    width: 100%;
}
.title_custom, .body_custom {
      font-family: "Poppins";
}
.info_container {
    min-height: 50px;
}
.author_img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
.view-img {
    height: 20px;
}
</style>