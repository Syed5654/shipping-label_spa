import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Landing.vue"),
    },
    {
      path: "/generate-label",
      name: "form",
      component: () => import("../views/Form.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/LabelsHistory.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/wallet",
      name: "wallet",
      component: () => import("../views/Wallet.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const jsonData = localStorage.getItem("user");
  const userData = JSON.parse(jsonData);
  if ( to.meta.requiresAuth && !userData) {
    next("/login");
  } else {
    next();
  }
});

export default router;
