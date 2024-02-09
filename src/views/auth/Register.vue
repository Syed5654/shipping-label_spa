<script setup>
import Api from "@/assets/js/Api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const data = ref({
  name: "",
  email: "",
  password: "",
});
const loading = ref(false);
const validation_message = ref({
  name: "",
  email: "",
  password: "",
});

onMounted(()=> {
  if(store.state.isLoggedIn){
    router.push('/')
  }
})

const handleRegister = () => {
  loading.value = true;
  try {
    Api.post("register", data.value).then((res) => {
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
        router.push("/");
      }
    });
  } catch (error) {
    console.error("Internal Server Error");
    loading.value = false;
    const toast = new Toast(document.getElementById('errorToast'))
  toast.show()
  }
};

const success = () => {
  (data.value = {
    name: "",
    email: "",
    password: "",
  }),
    (validation_message.value = {
      name: "",
      email: "",
      password: "",
    });
};
</script>
<template>
  <section
    class="register w-100 d-flex align-items-center justify-content-center bg-light"
  >
    <div class="container">
      <div class="row w-100 justify-content-center">
        <div class="col-lg-6">
          <div class="card border-0 shadow p-5 rounded-4">
            <div class="card-body">
              <div class="text-center mb-4">
                <h1 class="fst-italic font-bold text-primary mb-2">Logo.</h1>
                <h4>Create your account in Shippo.</h4>
              </div>
              <div class="w-100 mb-3">
                <label for="name" class="form-label">Full name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Please enter your full name"
                  v-model="data.name"
                />
                <small
                  class="text-danger"
                  v-for="message of validation_message.name"
                  :key="`${message}-name`"
                  >{{ message }}</small
                >
              </div>
              <div class="w-100 mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Please enter your email"
                  v-model="data.email"
                />
                <small
                  class="text-danger"
                  v-for="message of validation_message.email"
                  :key="`${message}-email`"
                  >{{ message }}</small
                >
              </div>
              <div class="w-100 mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Please enter your password"
                  v-model="data.password"
                />
                <small
                  class="text-danger"
                  v-for="message of validation_message.password"
                  :key="`${message}-password`"
                  >{{ message }}</small
                >
              </div>
              <div class="text-center mb-2">
                <button
                  class="btn btn-primary font-bold text-white px-5"
                  :disabled="loading"
                  @click="handleRegister"
                >
                  {{ loading ? "Please Wait" : "Register" }}
                </button>
              </div>
              <div class="text-center">
                <router-link to="/login" class="text-secondary"
                  ><small>Already have an account? Log In</small></router-link
                >
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
.register {
  min-height: 100vh;
  .error_toast{
  top: 13%;
  right: 1%;
}
}
</style>
