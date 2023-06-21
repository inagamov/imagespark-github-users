<template>
  <div class="absolute-center">
    <NotFoundComponent>
      <template #text> 404 </template>
    </NotFoundComponent>

    <div class="row justify-center">
      <button class="button">
        <router-link to="/" class="mt-lg link--clear"> Go home </router-link>
      </button>
    </div>
  </div>
</template>
<script setup>
import NotFoundComponent from "../components/NotFoundComponent.vue";
</script>
