<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 8px;
  height: 100%;
}
</style>
