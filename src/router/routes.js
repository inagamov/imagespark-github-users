import { ROUTE_PATHS } from "../constants/paths.js";

const routes = [
  {
    path: ROUTE_PATHS.INDEX,
    component: () => import("../pages/IndexPage.vue"),
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    component: () => import("../pages/NotFoundPage.vue"),
  },
];

export default routes;
