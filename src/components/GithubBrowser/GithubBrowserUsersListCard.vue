<template>
  <div class="row no-wrap full-width">
    <slot name="avatar" />
    <slot name="name" />

    <SpaceComponent />

    <slot name="action" />
  </div>
</template>

<script setup>
import SpaceComponent from "../SpaceComponent.vue";
</script>
