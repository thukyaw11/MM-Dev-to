<template>

<div class="justify-space-between d-flex align-center header-container">
  <NuxtLink to="/" style="text-decoration: none;" class="nuxt-link">
  <h1> <span class="font-weight-light">MM</span> <b>DEV.TO</b></h1>
  </NuxtLink>
  <div class="d-flex justify-space-between align-center">
    <NuxtLink to="/about" style="text-decoration: none; color: black">
    <span class="about-btn mr-3">About</span>
    </NuxtLink>
    <a href="https://github.com/thukyaw11/MM-Dev-to" target="blank" style="text-decoration: none">
    <Button button_text="Write Blog"/>  
    
    </a>
  </div>
</div>


</template>

<script>
import Button from '@/components/general/Button'
export default {

}
</script>

<style scoped>
.about-btn, h1{
  font-family: "Poppins";
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
}
.header-container {
  position: sticky;
  height: 70px;
  top: 0;
  background: white;
  z-index: 9;
}
.nuxt-link {
  color: var(--theme);
}
</style>
