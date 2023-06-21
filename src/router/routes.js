import { ROUTE_PATHS } from "../constants/paths.js";

const routes = [
  {
    path: ROUTE_PATHS.INDEX.PATH,
    redirect: ROUTE_PATHS.USERS.INDEX.PATH,
  },
  {
    path: ROUTE_PATHS.USERS.INDEX.PATH,
    component: () => import("../pages/GithubUsersBrowserPage.vue"),
  },
  {
    path: ROUTE_PATHS.USERS.USER.PATH,
    component: () => import("../pages/GithubUserProfilePage.vue"),
  },
  {
    path: ROUTE_PATHS.NOT_FOUND.PATH,
    component: () => import("../pages/NotFoundPage.vue"),
  },
];

export default routes;
