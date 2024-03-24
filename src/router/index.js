import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

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
    {
      path: "/role/admin/login",
      name: "Admin Login",
      component: () => import("../views/admin/Login.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/role/admin",
      name: "Admin Portal",
      component: () => import("../views/admin/Portal.vue"),
      meta: {
        requiresAuth: true,
        role:'admin'
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let store = useStore();
  const jsonData = localStorage.getItem("user");
  const userData = JSON.parse(jsonData);
  if(to.meta.requiresAuth && to.meta.role === 'admin' && store.state.user?.type !== 'admin'){
    next('/')
  }else if(to.meta.requiresAuth && !userData && to.name !== 'Admin Login'){
    next("/login");
  }
  else {
     next();
   } 
  
});

export default router;
