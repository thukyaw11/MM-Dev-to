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


<style>
html {
  scroll-behavior: smooth;
}
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #000; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>