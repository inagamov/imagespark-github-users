import { defineStore } from "pinia";
import axios from "axios";
import { GITHUB_URLS } from "../constants/githubURLs.js";

export const useGithubStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    requestTime: null,

    // users browser
    users: [],
    searchQuery: "",
    pagination: {
      page: 1,
      perPage: 25,
      sortOrder: "desc",
    },

    // user profile
    user: null,

    errorMessage: null,
  }),

  getters: {
    fetchUsersRequestQuery: (state) => {
      return `${GITHUB_URLS.API}/search/users?q=${
        state.searchQuery
      }+sort:repositories-${state.pagination.sortOrder}+${
        state.searchQuery
      }in:login&page=${state.pagination.page}&per_page=${
        state.pagination.perPage || 25
      }`;
    },
  },

  actions: {
    fetchGithubUsers(overwriteData = false) {
      this.isLoading = true;

      if (overwriteData) {
        this.users = [];
      }

      const startTime = performance.now();

      axios
        .get(this.fetchUsersRequestQuery)
        .then((response) => {
          const endTime = performance.now();
          this.requestTime = Math.round(endTime - startTime);

          response.data.items.map((item, itemIndex) => {
            setTimeout(() => {
              this.users.push(item);
            }, 69 * itemIndex);
          });

          this.pagination.page++;
        })
        .catch((error) => {
          this.errorMessage = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async fetchGithubUser(username) {
      this.isLoading = true;

      // fetch main data
      await axios
        .get(`${GITHUB_URLS.API}/users/${username}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.isLoading = false;
        });

      // fetch users' repositories
      await axios
        .get(`${GITHUB_URLS.API}/users/${username}/repos`)
        .then((response) => {
          this.user.repos = [];

          response.data.map((item, itemIndex) => {
            setTimeout(() => {
              this.user.repos.push(item);
            }, 25 * itemIndex);
          });
        })
        .catch((error) => {
          this.errorMessage = error;
          this.isLoading = false;
        });

      this.isLoading = false;
    },

    clearSearchQuery() {
      this.searchQuery = "";
    },
  },
});
