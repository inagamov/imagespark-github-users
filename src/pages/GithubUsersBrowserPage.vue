<template>
  <div class="container" ref="scrollArea">
    <!-- header (search, sort) -->
    <GithubBrowserHeader />

    <!-- results, settings -->
    <div class="row no-wrap">
      <h4 class="mb-md mt-none text-no-wrap">
        {{ state.users.value.length }} results
      </h4>

      <div v-if="state.requestTime.value" class="text-caption ml-sm">
        ({{ state.requestTime.value }}ms)
      </div>

      <SpaceComponent />

      <GithubBrowserSettings />
    </div>

    <!-- loading spinner -->
    <LoadingSpinner v-if="state.isLoading.value" class="loading_spinner" />

    <!-- users list -->
    <GithubBrowserUsersList v-else :users="state.users.value" />
  </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGithubStore } from "../stores/github-store.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import GithubBrowserHeader from "../components/GithubBrowser/GithubBrowserHeader.vue";
import GithubBrowserUsersList from "../components/GithubBrowser/GithubBrowserUsersList.vue";
import SpaceComponent from "../components/SpaceComponent.vue";
import GithubBrowserSettings from "../components/GithubBrowser/GithubBrowserSettings.vue";

/*
 * github store
 */
const state = storeToRefs(useGithubStore());
const store = useGithubStore();

/*
 * functions
 */
onBeforeMount(() => {
  store.fetchGithubUsers();

  window.addEventListener("scroll", handleScroll);
});

/*
 * handle scroll
 */
const scrollArea = ref();
function handleScroll() {
  if (!scrollArea.value) {
    return;
  }

  if (
    scrollArea.value.getBoundingClientRect().bottom < window.innerHeight &&
    !state.isLoading.value
  ) {
    store.fetchGithubUsers();
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
/*
 * loading spinner
 */
.loading_spinner {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%);
}
</style>
