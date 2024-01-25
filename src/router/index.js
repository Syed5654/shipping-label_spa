import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "form",
      component: () => import("../views/Form.vue"),
    },
  ],
});

export default router;
