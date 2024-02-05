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

onBeforeMount(async () => {
  if (userData) {
    store.state.user = userData;
    await validateUser();
  }
});

const validateUser = async () => {
  await Api.post(
    "validate-user",
    { userId: userData.id },
    {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    }
  )
    .then((res) => {
      if (res.data.error) {
        router.push("/login");
      }
    })
    .catch((error) => {
      console.error("Internal Server Error");
      router.push("/login");
    });
};
</script>

<template>
  <Navbar
    v-if="route.name && route.name !== 'register' && route.name !== 'login'"
  />
  <RouterView />
</template>
