<template>
  <div class="user_profile__card">
    <!-- avatar -->
    <img
      :src="user?.avatar_url"
      :alt="user?.login"
      class="user_profile__card__avatar"
    />

    <!-- name, login -->
    <div class="mt-md">
      <div class="user_profile__card__name">
        {{ user?.name }}
      </div>
      <div class="user_profile__card__login">
        {{ user?.login }}
      </div>
    </div>

    <!-- follow button -->
    <a :href="`${GITHUB_URLS.INDEX}/${user?.login}`" target="_blank">
      <button class="button user_profile__card__action_button mt-md">
        Follow
      </button>
    </a>

    <!-- bio -->
    <div class="mt-md">{{ user?.bio }}</div>

    <!-- following, followers-->
    <div class="user_profile__card__details my-md">
      <i class="icon icon-users-group" />

      <a
        :href="`${GITHUB_URLS.INDEX}/${user?.login}?tab=followers`"
        class="link--default"
        target="_blank"
      >
        <b>{{ user?.followers }}</b>
        Followers
      </a>

      <div class="mx-xs">·</div>

      <a
        :href="`${GITHUB_URLS.INDEX}/${user?.login}?tab=following`"
        class="link--default"
        target="_blank"
      >
        <b>{{ user?.following }}</b>
        Following
      </a>
    </div>

    <!-- company -->
    <div v-if="user?.company" class="user_profile__card__details">
      <i class="icon icon-company" />

      <a
        :href="`${GITHUB_URLS.INDEX}/${user?.company}`"
        class="user_profile__card__details link--underline"
        target="_blank"
      >
        <b>{{ user?.company }}</b>
      </a>
    </div>

    <!-- location -->
    <div v-if="user?.location" class="user_profile__card__details mt-xs">
      <i class="icon icon-pin" />
      {{ user?.location }}
    </div>

    <!-- blog link -->
    <div v-if="user?.blog" class="user_profile__card__details mt-xs">
      <i class="icon icon-link" />

      <a :href="user?.blog" class="link--default ellipsis" target="_blank">
        {{ user?.blog }}
      </a>
    </div>

    <!-- twitter -->
    <div
      v-if="user?.twitter_username"
      class="user_profile__card__details mt-xs"
    >
      <i class="icon icon-twitter" />

      <a
        :href="`https://twitter.com/${user?.twitter_username}`"
        target="_blank"
        class="link--default"
      >
        @{{ user?.twitter_username }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { GITHUB_URLS } from "../../constants/githubURLs.js";

defineProps({
  user: { type: Object, default: null },
});
</script>

<style scoped lang="scss">
.user_profile__card {
  width: 296px;

  .user_profile__card__avatar {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 100%;
    border: 1px solid $grey;
  }

  .user_profile__card__name {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
  }

  .user_profile__card__login {
    font-size: 20px;
    color: $grey-3;
  }

  .user_profile__card__action_button {
    width: 100%;
    height: 32px;
  }

  .user_profile__card__details {
    display: flex;
    font-size: 14px;
    color: $black;

    i {
      margin: auto 0;
      padding-right: 8px;
      color: $grey-3;
      margin-bottom: -2px;
    }

    a {
      margin: auto 0;
    }
  }
}
</style>
