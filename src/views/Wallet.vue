<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import Api from '@/assets/js/Api';
import { Toast } from 'bootstrap'
import { useRoute } from "vue-router";

const route = useRoute()
const store = useStore()
const data = ref({
  userId: store.state.user.id,
  amount: ''
})

const validation_message = ref({
  amount: ''
})
const balance = ref(0.00)
const loading = ref(false)

onMounted(() => {
  getUserBalance()

  if (route.query.payment === 'success') {
    const successToast = new Toast(document.getElementById('successPayment'))
    successToast.show()
  }
  if (route.query.payment === 'failed') {
    const errorToast = new Toast(document.getElementById('paymentError'))
    errorToast.show()
  }
})

const topUpBalance = async () => {
  try {
    loading.value = true
    await Api.post('create-checkout-session', data.value, {
      headers: {
        Authorization: `Bearer ${store.state.user.accessToken}`
      }
    }).then((res) => {
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
        window.location = res.data.url;
        loading.value = false;
        success();
      }
    })

  } catch (error) {
    console.log("Internal Server Error", error);
    loading.value = false
  }

}

const getUserBalance = async () => {
  try {
    await Api.post('get-balance', { userId: data.value.userId }, {
      headers: {
        Authorization: `Bearer ${store.state.user.accessToken}`
      }
    }).then((res) => {
      if (!res.data.error) {
        balance.value = Number(res.data.balance).toFixed(2);
      }
    })
  } catch (error) {
    console.log('Internal Server Error', error);
  }

}

const success = () => {
  data.value = {
    userId: store.state.user.id,
    amount: ''
  }
  validation_message.value = {
    amount: ''
  }
}
</script>
<template>
  <div class="wallet py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card mb-4">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-wallet fs-2 me-2"></i>
                <h2 class="font-medium mb-0">Wallet</h2>
              </div>
              <p class="fs-4 mb-0">Available balance: ${{ balance }}</p>

            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h2 class="font-medium mb-3 fs-4">Topup Balance</h2>
              <div class="row mb-4">
                <div class="col-lg-6 col-md-10">
                  <label for="amount" class="form-label">Topup Amount <span>($)</span></label>
                  <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" id="amount" placeholder="Please enter your amount for topup" min="0" v-model="data.amount" >
                    <span class="input-group-text">.00</span>
                  </div>
                  <small class="text-danger" v-for="message of validation_message.amount" :key="`${message}-amount`">{{
                    message }}</small>
                </div>
              </div>
              <div class="text-center">
                <button class="btn btn-primary text-white font-bold topup-btn" :disabled="loading"
                  @click="topUpBalance">{{ loading ? 'Please Wait' : "Topup Balance" }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Success Toast -->
    <div class="payment_toast position-fixed">
      <div id="successPayment" class="toast align-items-center text-bg-success border-0" role="alert"
        aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Payment Successful.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </div>
    <!-- Error Toast -->
    <div class="payment_toast position-fixed">
      <div id="paymentError" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Payment Failed! Please try again.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wallet {
  min-height: calc(100vh - 76px);

  .topup-btn {
    width: 50%;

    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  .payment_toast {
    top: 13%;
    right: 1%;
  }
}
</style>