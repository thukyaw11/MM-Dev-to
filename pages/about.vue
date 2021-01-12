<template>
  <div class="about_container">
      <h2 class="mt-5">About Me</h2>
      <v-row class="mt-5">
          <v-col cols="12" md="4">
                <img src="https://i.ibb.co/th8SZZh/FotoJet.jpg" alt="" class="about_img">
          </v-col>
          <v-col cols="12" md="8">

          <div class="about_content ml-md-5">
              <div class="name">Min Thu Kyaw</div>
              <div class="text--secondary">Web Developer Based in Yangon</div>
              <div class="social_icon mt-5">
                      <v-icon class="icon mr-2">mdi-facebook</v-icon>
                      <v-icon class="icon">mdi-web</v-icon>
              </div>
              <div class="how-to mt-5">
                  Want to post a blog here? <br class="d-block d-lg-none">
                  <NuxtLink to="/howto" style="color: black">
                    <span class="text-decoration-underline"><b>Check here how to contribute!</b> </span> 
                  </NuxtLink>
              </div>
          </div>
          </v-col>
      

      </v-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.icon{
    cursor: pointer;
}
.about_container {
    height: auto;
    width: 100%;
}
.about_img{
    height: 100%;
    width: 100%;
}
h2,.text--secondary{
    font-family: 'Poppins';
}
.name{
    font-size: 30px;
    font-family: 'Poppins';

}
</style>