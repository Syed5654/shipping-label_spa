<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter()
const store = useStore()
const userName = store.state.user.name.split(' ')[0]

const logOut = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
<template>
  <div class="navbar shadow-sm bg-dark">
    <div class="container">
      <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between w-100">
        <div>
          <router-link to="/" class="fs-1 fst-italic font-bold text-primary text-decoration-none">Logo.</router-link>
        </div>
        <div class="d-flex align-items-center">
          <router-link to="/" class="text-white text-decoration-none me-4 font-medium">Generate Label</router-link>
          <router-link to="/history" class="text-white text-decoration-none me-4 font-medium">Order History</router-link>
          <div class="dropdown">
            <a href="javascript:void(0)" class="dropdown-toggle text-white d-flex align-items-center text-decoration-none" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
             <i class="bi bi-person-circle fs-3"></i>
               <span class="text-capitalize ms-2">{{ userName }}</span>
          </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li :class="{'bg-primary' : $route.path === '/wallet' || $route.path === '/wallet/'}"><router-link to="/wallet"  class="dropdown-item d-flex align-items-center"><i class="bi bi-wallet me-2" :class="{'text-white' : $route.path === '/wallet' || $route.path === '/wallet/'}"></i><span :class="{'text-white' : $route.path === '/wallet' || $route.path === '/wallet/'}">Wallet</span></router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item d-flex align-items-center" @click="logOut"><i class="bi bi-box-arrow-in-left me-2"></i><span>Logout</span></button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  .router-link-active {
    color: #FFC107 !important;
  }

  .avatar{
    width: 40px;
    height: 40px;
  }
}
</style>