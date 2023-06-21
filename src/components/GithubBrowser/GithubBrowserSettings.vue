<template>
  <div class="row no-wrap">
    <div class="text-no-wrap text-caption pr-sm">rows per page</div>
    <input
      v-model="state.pagination.value.perPage"
      placeholder="20"
      class="input--default text-center"
      style="width: 40px"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGithubStore } from "../../stores/github-store.js";
import { watch } from "vue";

/*
 * github store
 */
const state = storeToRefs(useGithubStore());
const store = useGithubStore();

/*
 * handle settings update
 */
watch(
  () => state.pagination.value.perPage,
  () => {
    store.fetchGithubUsers(true);
  }
);
</script>
