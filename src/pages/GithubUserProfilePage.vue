<template>
  <div class="container">
    <Transition>
      <!-- loading spinner -->
      <LoadingSpinner v-if="state.isLoading.value" class="loading_spinner" />

      <!-- user profile -->
      <div v-else class="user_profile">
        <!-- user card -->
        <GithubUserProfileCard :user="state.user.value" />

        <!-- repos -->
        <GithubUserProfileRepos
          :repos="state.user.value?.repos"
          :back-path="ROUTE_PATHS.USERS.INDEX.PATH"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useGithubStore } from "../stores/github-store.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import GithubUserProfileCard from "../components/GithubUserProfile/GithubUserProfileCard.vue";
import GithubUserProfileRepos from "../components/GithubUserProfile/GithubUserProfileRepos.vue";
import { ROUTE_PATHS } from "../constants/paths.js";

const route = useRoute();

/*
 * github store
 */
const state = storeToRefs(useGithubStore());
const store = useGithubStore();

onBeforeMount(() => {
  store.fetchGithubUser(route.params.username);
});
</script>

<style scoped lang="scss">
.container {
  width: 1000px;
  max-width: 1000px;
}

.user_profile {
  display: flex;
  gap: 32px;
  padding: 24px 0;

  button {
    font-size: 14px;
  }
}

/*
 * loading spinner
 */
.loading_spinner {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translate(-50%);
}

/*
 * fade transition
 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
