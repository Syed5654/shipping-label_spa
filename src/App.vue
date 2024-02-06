<script setup>
import Navbar from "./components/layouts/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
import Api from "@/assets/js/Api";

const route = useRoute();
const router = useRouter();
const store = useStore();
const jsonData = localStorage.getItem("user");
const userData = JSON.parse(jsonData);

onBeforeMount(() => {
  if (userData) {
    store.state.user = userData;
    if(!store.state.isLoggedIn){
      validateUser();
    }
  }
});

const validateUser = async () => {
  try {
    await Api.post("validate-user", { userId: userData.id },
      {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      }
    ).then((res) => {
      if (res.data.error) {
        localStorage.removeItem('user')
        router.push("/login");
      }else{
        store.state.isLoggedIn = true
      }
    });
  } catch (error) {
    router.push("/login");
    console.error("Internal Server Error", error);
  }
};
</script>

<template>
  <Navbar
    v-if="route.name && route.name !== 'register' && route.name !== 'login'"
  />
  <RouterView />
</template>
