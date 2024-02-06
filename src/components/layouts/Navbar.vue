<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const logOut = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
<template>
  <div class="navbar shadow-sm bg-dark">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div>
          <router-link to="/" class="fs-1 fst-italic font-bold text-primary text-decoration-none">Logo.</router-link>
        </div>
        <div>
          <router-link to="/" class="text-white text-decoration-none me-4 font-medium">Generate Label</router-link>
          <router-link to="/history" class="text-white text-decoration-none me-4 font-medium">Order History</router-link>
          <button class="btn btn-light" @click="logOut">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar{
  .router-link-active{
    color: #FFC107 !important;
  }
}
</style>