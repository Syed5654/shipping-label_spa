<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
import Api from "@/assets/js/Api";

const route = useRoute();
const router = useRouter();
const store = useStore();
const jsonData = localStorage.getItem("user");
const userData = JSON.parse(jsonData);
const loading = ref(false)

onBeforeMount(() => {
  if (userData) {
    store.state.user = userData;
    if (!store.state.isLoggedIn) {
      validateUser();
    }
  }
});

const validateUser = async () => {
  try {
    loading.value = true;
    await Api.post("validate-user", { userId: userData.id },
      {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      }
    ).then((res) => {
      if (!res.data.error) {
        store.state.isLoggedIn = true
        loading.value = false
      } else {
        store.state.isLoggedIn = false
        localStorage.removeItem('user')
        loading.value = false;
        router.push("/login");
      }
    });
  } catch (error) {
    store.state.isLoggedIn = false
    localStorage.removeItem('user')
    loading.value = false
    router.push("/login");
    console.error("Internal Server Error", error);
  }
};
</script>

<template>
  <div class="vh-100 w-100 d-flex align-items-center justify-content-center" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <Navbar v-if="route.name && route.name !== 'register' && route.name !== 'login' && route.name !== 'Admin Login' && route.name !== 'Admin Portal'" />
    <RouterView />
    <Footer v-if="route.name && route.name !== 'Admin Login' && route.name !== 'Admin Portal'"/>
  </div>
</template>
