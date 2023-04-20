import { createRouter, createWebHistory } from "vue-router";
import ConfView from "../views/paramsConfig.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "conf",
      component: ConfView,
    },
  ],
});

export default router;
