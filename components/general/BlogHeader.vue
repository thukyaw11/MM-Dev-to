<template>
  <div class="blog_header_info d-flex justify-space-between">
      <div>
      <h1>{{blog_title}}</h1>

        <p class="text--secondary mt-3">12:00 AM - Jan 7, 2100</p>
        <div v-for="(slug, i) in slugs" :key="i">
        <NuxtLink style="text-decoration: none"  :to="`/blog/tag/${slug.slug}`" class="tag">
            <p class="text--secondary"> # {{slug.name}}</p>
        </NuxtLink>
        </div>
       
      </div>
      <ShareNetwork
    network="facebook"
    :url="url"
    :title="blog_title"
    :description="blog_title"
    :quote="blog_title"
    hashtags="mmdev_to"
    style="text-decoration: none"
  >
    <Button button_text="Share"/>
</ShareNetwork>
     
  </div>
</template>

<script>
export default {
    props: {
        blog_title : {
            type: String
        },
        blog_created_time: {
            type: String
        },
        blog_tag: {
            type: String
        },
        slugs: {
            requied: true
        },
        url: {
            type: String
        }
    }

}
</script>

<style scoped>
.blog_header_info {
    width: 100%;
    height: auto;
    font-family: 'Poppins';
}
.tag{
    float: left;
    margin: 10px;
}
</style>