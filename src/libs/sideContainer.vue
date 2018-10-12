<template>
  <div class="vue-toast-confirm-side-container">

  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.vue-toast-confirm-side-container {
  position: fixed;
  display: flex;
  max-height: 100%;
  top: 0;
  right: 0;
  padding-top: 20px;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap-reverse;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1;
  z-index: 99;
}

@media screen and (min-width: 1000px) {
  .vue-toast-confirm-side-container {
    padding-right: 40px;
  }
}
@media screen and (max-width: 999px) and (min-width: 700px) {
  .vue-toast-confirm-side-container {
    padding-right: 15px;
  }
}
@media screen and (max-width: 699px) {
  .vue-toast-confirm-side-container {
    padding-right: 0;
  }
}
</style>
