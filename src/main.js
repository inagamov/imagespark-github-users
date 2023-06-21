import { createApp } from "vue";
import "./css/app.scss";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./stores/index.js";

createApp(App).use(store).use(router).mount("#app");
