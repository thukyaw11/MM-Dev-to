<template>
    <div class="tag_bar_container d-flex align-center">
        <div v-for="(item, index) in tags" :key="index">
        <NuxtLink :to="`/blog/tag/${item.slug}`" style="text-decoration: none">
            <Button :button_text="item.name" class="mr-1"/>
         </NuxtLink>
        </div>
     
    </div>
</template>

<script>
import Button from '@/components/general/Button'
export default {
    components: {
        Button
    },
    props: {
        tags: {
            type: Array
        }
    }
}
</script>

<style scoped>
.tag_bar_container {
    overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.tag_bar_container::-webkit-scrollbar {
  display: none;
}
</style>