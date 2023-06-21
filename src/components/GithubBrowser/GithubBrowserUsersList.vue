<template>
  <div>
    <NotFoundComponent v-if="!users?.length">
      <template #text> Your search did not match any users </template>
    </NotFoundComponent>

    <TransitionGroup>
      <div v-for="user in users" :key="user.id" class="card mb-md pa-md">
        <GithubBrowserUsersListCard>
          <!-- user avatar -->
          <template #avatar>
            <img
              :src="user.avatar_url"
              :alt="user.login"
              class="card__avatar mr-md"
            />
          </template>

          <!-- username -->
          <template #name>
            <router-link
              :to="computeUserProfileLink(user)"
              class="card__name text-no-wrap"
              style="margin: auto 0"
            >
              {{ user.login }}
            </router-link>
          </template>

          <!-- open user profile -->
          <template #action>
            <button class="button" style="margin: auto 0">
              <router-link
                :to="computeUserProfileLink(user)"
                class="link--clear"
              >
                Open
              </router-link>
            </button>
          </template>
        </GithubBrowserUsersListCard>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import GithubBrowserUsersListCard from "./GithubBrowserUsersListCard.vue";
import { ROUTE_PATHS } from "../../constants/paths.js";
import NotFoundComponent from "../NotFoundComponent.vue";

defineProps({
  users: { type: Array, default: null },
});

const computeUserProfileLink = (user) => {
  return ROUTE_PATHS.USERS.USER.PATH.replace(
    ROUTE_PATHS.USERS.USER.PARAMETERS.USERNAME,
    user.login
  );
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 12px;
  border: 1px solid $grey;
  display: flex;
}

.card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid #e3e3e4;
}

.card__name {
  color: $accent;
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
}

.card__name:hover {
  text-decoration: underline;
}

/*
 * scale transition
 */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
