<template>
<NuxtLink :to="{name : 'blog-slug', params: {slug: blog.slug}}" style="text-decoration: none">
  <div class="blog_card_container">
      <div class="blog_img_container">
          <img class="blog_img" :src="blog.img"/>
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
        }
    }
}
</script>

<style scoped>
.blog_card_container {
    height: 400px;
    width: 100%;
    background: #fff;
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
</style>