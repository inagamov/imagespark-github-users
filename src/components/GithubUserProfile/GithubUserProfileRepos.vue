<template>
  <div class="user_profile__repos">
    <div class="row no-wrap mb-lg">
      <!-- go back -->
      <router-link
        v-if="backPath"
        :to="backPath"
        class="link--clear column justify-end mb-xs"
      >
        <i class="icon icon-left" />
      </router-link>

      <!-- title -->
      <div class="user_profile__repos__title">Repos</div>
    </div>

    <!-- no repos -->
    <NotFoundComponent v-if="!repos?.length">
      <template #text> No Repositories </template>
    </NotFoundComponent>

    <!-- repos -->
    <div class="user_profile__repos__list justify-between">
      <TransitionGroup>
        <div
          v-for="repo in repos"
          :key="repo.id"
          class="user_profile__repos__list__card"
        >
          <!-- repo name & link -->
          <div class="row no-wrap">
            <i
              class="icon icon-repo user_profile__repos__list__card__repo_icon"
            />

            <a
              :href="repo.html_url"
              target="_blank"
              class="link-blue link--underline ellipsis"
              style="max-width: 200px"
            >
              {{ repo.full_name }}
            </a>

            <div class="user_profile__repos__list__card__visibility">
              {{ repo.visibility }}
            </div>
          </div>

          <!-- description -->
          <div class="user_profile__repos__list__card__description">
            {{ repo.description }}
          </div>

          <!-- details -->
          <div class="user_profile__repos__list__card__details">
            <div v-if="repo.language" class="mr-md">
              {{ repo.language }}
            </div>

            <a
              :href="`${repo.html_url}/stargazers`"
              target="_blank"
              class="link--default mr-md"
            >
              <i class="icon icon-star" />
              {{ repo.stargazers_count }}
            </a>

            <a
              :href="`${repo.html_url}/forks`"
              target="_blank"
              class="link--default"
            >
              <i class="icon icon-fork" />
              {{ repo.forks }}
            </a>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import NotFoundComponent from "../NotFoundComponent.vue";

defineProps({
  repos: { type: Array, default: null },
  backPath: { type: String, default: null },
});
</script>

<style scoped lang="scss">
.user_profile__repos {
  width: 100%;

  i {
    color: $grey-3;
  }

  .user_profile__repos__title {
    font-size: 24px;
    padding-left: $padding-sm;
  }

  .user_profile__repos__list {
    columns: 2;
    column-gap: $margin-md;

    .user_profile__repos__list__card {
      break-inside: avoid;
      margin-bottom: $margin-md;

      border: 1px solid $grey;
      border-radius: 12px;
      padding: 16px;

      .user_profile__repos__list__card__repo_icon {
        margin: auto 0;
        margin-right: $margin-md;
      }

      a {
        font-size: 14px;
        text-decoration: none;
      }

      .user_profile__repos__list__card__visibility {
        border-radius: 2em;
        color: $grey-2;
        font-size: 12px;
        border: 1px solid $grey;
        padding: 0 8px;
        font-weight: 500;
        height: 18px;
        line-height: 18px;
        margin-left: $margin-sm;
      }

      .user_profile__repos__list__card__description {
        font-size: 12px;
        color: $grey-2;
        margin: $margin-xs 0 $margin-sm 0;
      }

      .user_profile__repos__list__card__details {
        font-size: 12px;
        color: $grey-3;
        display: flex;

        a {
          font-size: 12px;
          display: flex;
        }

        i {
          font-size: 16px;
          height: 16px;
          margin-bottom: -2px;
          margin-right: $margin-xs;
        }
      }
    }
  }
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
