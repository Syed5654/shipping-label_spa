<script setup>
import Api from "@/assets/js/Api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from 'bootstrap'

const router = useRouter();
const store = useStore();
const data = ref({
  email: "",
  password: "",
});
const loading = ref(false);
const validation_message = ref({
  email: "",
  password: "",
});

onMounted(()=> {
  if(store.state.isLoggedIn){
    router.push('/generate-label')
  }

  window.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter'){
      handleLogin()
    }
  })
})

const handleLogin = () => {
  try {
    loading.value = true;
    Api.post("login", data.value).then((res) => {
      if (res.data.error) {
        validation_message.value = res.data.validation_message;
        let fieldNames = Object.keys(res.data.validation_message);
        fieldNames.forEach((field) => {
          let inputFields = document.getElementById(field);
          inputFields.classList.add("is-invalid");
          let firstInputField = document.getElementById(fieldNames[0]);
          firstInputField.focus();
          inputFields.addEventListener("input", () => {
            if (inputFields.value.trim() !== "") {
              inputFields.classList.remove("is-invalid");
            } else {
              inputFields.classList.add("is-invalid");
            }
          });
        });
        loading.value = false;
        return;
      } else {
        loading.value = false;
        store.state.user = res.data.user;
        store.state.isLoggedIn = true
        const user = JSON.stringify(res.data.user)
        localStorage.setItem("user", user);
        success();
        router.push("/generate-label");
      }
    });
  } catch (error) {
    loading.value = false;
    const toast = new Toast(document.getElementById('errorToast'))
    toast.show()
    console.error("Internal Server Error");
  }
};

const success = () => {
  (data.value = {
    email: "",
    password: "",
  }),
    (validation_message.value = {
      email: "",
      password: "",
    });
};
</script>
<template>
  <section class="login w-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container">
      <div class="row w-100 justify-content-center">
        <div class="col-lg-6">
          <div class="card border-0 shadow p-2 p-sm-5 rounded-4">
            <div class="card-body">
              <div class="text-center mb-4">
                <h2 class="fst-italic font-bold text-primary mb-2">Ecomfulfil.</h2>
                <h4>Login to your account.</h4>
              </div>
              <div class="w-100 mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" placeholder="Please enter your email"
                  v-model="data.email" />
                <small class="text-danger" v-for="message of validation_message.email" :key="`${message}-email`">{{
                  message }}</small>
              </div>
              <div class="w-100 mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Please enter your password"
                  v-model="data.password" />
                <small class="text-danger" v-for="message of validation_message.password" :key="`${message}-password`">{{
                  message }}</small>
              </div>
              <div class="text-center mb-2">
                <button class="btn btn-primary font-bold text-white px-5" :disabled="loading" @click="handleLogin">
                  {{ loading ? "Please Wait" : "Login" }}
                </button>
              </div>
              <div class="text-center">
                <router-link to="/register" class="text-secondary"><small>Don't have a account? Register
                    here</small></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Error Toast -->
  <div class="error_toast position-fixed">
    <div id="errorToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive"
      aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Something went wrong, please try again.
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
          aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  min-height: 100vh;
  .error_toast{
  top: 13%;
  right: 1%;
}
}
</style>