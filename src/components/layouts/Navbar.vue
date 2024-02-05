<script setup>
import { useRouter } from "vue-router"

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
        <button class="btn btn-light" @click="logOut">Logout</button>
      </div>
    </div>
  </div>
</template>