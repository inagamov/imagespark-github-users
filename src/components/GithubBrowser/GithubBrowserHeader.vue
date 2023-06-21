<template>
  <div
    class="header row no-wrap container"
    :class="isHighlighted ? 'header--highlighted' : 'header--not-highlighted'"
  >
    <!-- github logo -->
    <a :href="GITHUB_URLS.INDEX" target="_blank" class="link--clear">
      <i
        class="icon icon-github-mark"
        style="font-size: 32px; height: 32px; line-height: 32px"
      />
    </a>

    <!-- search input -->
    <div class="input__wrapper mx-md">
      <InputComponent
        :value="state.searchQuery.value"
        @click="!isHighlighted ? (isHighlighted = true) : ''"
        @input="handleInput($event)"
      >
        <template #prepend>
          <!-- search icon -->
          <i class="icon icon-search" />
        </template>

        <template #append>
          <!-- error icon -->
          <div
            v-if="state.errorMessage.value"
            class="text-error row no-wrap pr-md"
          >
            <span class="mr-xs">403</span>
            <i class="icon icon-error text-error" />
          </div>

          <!-- close icon -->
          <i
            v-if="isHighlighted && state.searchQuery.value"
            class="icon icon-close"
            @click="store.clearSearchQuery()"
          />

          <!-- forward slash icon -->
          <i
            v-else
            class="icon icon-forward-slash"
            style="
              border-radius: 4px;
              border: 1px solid rgba(151, 154, 156, 0.4);
            "
          />
        </template>
      </InputComponent>
    </div>

    <!-- sort icon -->
    <button class="button" style="height: 32px" @click="toggleSort()">
      <div
        style="height: 14px; transition: 0.275s"
        :style="
          state.pagination.value.sortOrder === 'desc'
            ? 'transform: rotate(180deg);'
            : ''
        "
      >
        <i class="icon icon-up" style="font-size: 14px" />
      </div>
    </button>
  </div>

  <!-- background overlay -->
  <Transition>
    <div
      v-show="isHighlighted"
      class="background_overlay"
      @click="isHighlighted = false"
    />
  </Transition>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useGithubStore } from "../../stores/github-store.js";
import InputComponent from "../InputComponent.vue";
import { GITHUB_URLS } from "../../constants/githubURLs.js";

/*
 * github store
 */
const state = storeToRefs(useGithubStore());
const store = useGithubStore();

/*
 * variables
 */
const isHighlighted = ref(false);

/*
 * handle keydown
 */
const handleKeyDown = (event) => {
  if (event.key === "/") {
    isHighlighted.value = !isHighlighted.value;
  }

  if (event.key === "Escape") {
    isHighlighted.value = false;
  }

  if (event.key === "Enter") {
    isHighlighted.value = false;
  }
};

onBeforeMount(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

/*
 * handle input
 */
const handleInput = (value) => {
  state.searchQuery.value = value;
  const query = state.searchQuery.value;

  setTimeout(() => {
    if (query === state.searchQuery.value) {
      store.fetchGithubUsers(true);
    }
  }, 500);
};

/*
 * handle sort toggle
 */
const toggleSort = () => {
  state.pagination.value.sortOrder =
    state.pagination.value.sortOrder === "desc" ? "asc" : "desc";

  store.fetchGithubUsers(true);
};
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 2001;
  background: $white;
  transition: 0.4s;
  padding: 16px;
  margin: 16px -16px;
  width: calc(100% + 32px);
  border-radius: 20px;

  &.header--highlighted {
    transform: scale(1.1);
    top: 16px;
  }

  &.header--not-highlighted {
    .input__wrapper,
    input {
      cursor: pointer;
    }
  }
}

.input__wrapper {
  width: 100%;

  i {
    font-size: 14px;
    height: 20px;
    max-height: 18px;
    color: $grey-2;
    margin: auto 0;
  }
}

/*
 * background overlay
 */
.background_overlay {
  position: fixed;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  background: rgba(31, 35, 40, 0.5);
  top: 0;
  left: 0;
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
