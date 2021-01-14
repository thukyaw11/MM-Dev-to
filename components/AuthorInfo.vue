<template>
  <div class="author_info_container d-flex justify-space-between px-3 align-center">
      <div class="d-flex">

          <NuxtLink :to="`/blog/author/${author.name}`" style="text-decoration: none; color: black;" class="d-flex align-center">
    
        <img :src="author.img" alt="" class="author_img">
        <div class="author_detail px-3">
          <div class="author_name font-weight-bold">{{author.name}}</div>
          <div class="author_bio font-weight-light">{{author.bio}}</div>
      </div>
          </NuxtLink>
      </div>
      <Button button_text="Follow" class="mr-3"/>
  </div>
</template>

<script>
import Button from '@/components/general/Button.vue'
export default {
    components: {
        Button
    },
    props: {
        author: {
            type: Object,
            default: null
        }
    },
}
</script>

<style scoped>
    .author_info_container {
        min-height: 100px;
        width: 100%;
        background: #eee;
        border-radius: 4px;
    }
    .author_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .author_name {
        font-size: 25px;
    }
</style>