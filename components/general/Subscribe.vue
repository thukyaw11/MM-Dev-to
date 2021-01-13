<template>
<div>
  <div class="d-flex justify-between my-3 mt-10 input-box align-center">
  <input class="search_container px-3 flex-grow-1" placeholder="Enter your email"/>
  <span class="search_icon d-flex justify-center"> 

     <Button button_text="Subscribe" size="large"/>
  </span>
</div>
<small class="text--secondary">we will send an information once I upload a new post. It is free</small>
<small style="color: red">** Will implement later with node :))</small>
</div>
</template>

<script>
import Button from '@/components/general/Button'
export default {
    components: {
        Button
    }
}
</script>

<style scoped>

</style>