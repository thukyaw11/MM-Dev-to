<template>
  <v-app> 
    <v-container>
      <Header />
      <Search />
     <Nuxt />
     <Subscribe />
    </v-container>
  </v-app>
</template>


<script>
import Header from '@/components/general/Header.vue'
import Search from '@/components/general/SearchBar.vue'
import Subscribe from '@/components/general/Subscribe.vue'
export default {
    components: {
    Header,
    Search,
    Subscribe
  },
}
</script>
