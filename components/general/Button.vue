<template>
  <div class="button_container px-2 d-flex align-center" :class="size">
      {{button_text}}
  </div>
</template>

<script>
export default {
    props: {
        button_text: {
            type: String,
        },
        size: {
            type: String,
            default: 'normal'
        }
    }
}
</script>

<style scoped>
.button_container {
    color: #fff;
    background: #000;
    cursor: pointer;
}
.normal{
    height: 32px;
    width: auto;
    font-size: 15px;
}
.small {
    height: 22px;
    width: auto;
    font-size: 10px;
}
</style>