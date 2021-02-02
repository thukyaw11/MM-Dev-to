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

<style>
.button_container {
    color: #fff;
    background: var(--theme);
    text-align: center;
    cursor: pointer;
      -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
}
.normal{
    height: 35px;
    width: auto;
    font-size: 15px;
}
.small {
    height: 22px;
    width: auto;
    font-size: 10px;
}
</style>