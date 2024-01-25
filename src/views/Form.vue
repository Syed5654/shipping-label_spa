<script setup>
import axios from 'axios'
import { ref } from "vue";

const data = ref({
  weight: '',
  sender_address: {
    name: '',
    company: '',
    street: '',
    street_2: '',
    zip: '',
    state: '',
    city: '',
    country: ''
  },
  receiver_address: {
    name: '',
    company: '',
    street: '',
    street_2: '',
    zip: '',
    state: '',
    city: '',
    country: ''
  }
})

const isAnyFieldEmpty = () => {
  const allValues = [
    data.value.weight,
    ...Object.values(data.value.sender_address),
    ...Object.values(data.value.receiver_address)
  ];

  return allValues.some(value => value === '');
};



const submitData = () => {
  if (isAnyFieldEmpty()) {
    console.log('empty');
  } else {
      downloadPDF()
  }


}

const downloadPDF = async () => {
  try {
    const response = await fetch('/dummy.pdf');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dummy.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}
</script>
<template>
  <div class="py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <h1 class="text-primary mb-3 font-bold text-center">Generate Order Label</h1>
          <div class="card mb-4">
            <div class="card-header bg-secondary">
              <h4 class="text-primary mb-0">Package Details</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="weight" class="form-label mb-2">Available Courier:</label>
                  <br>
                  <div class="d-inline-block border border-2 border-success rounded-4 p-3 position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      <i class="bi bi-check-lg fs-6"></i>
                    </span>
                    <img src="@/assets/img/usps.svg" alt="USPS" class="img-fluid" width="100">
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="weight" class="form-label fs-5">Weight <span class="text-black-50 fst-italic">(70.00
                      lbs max)</span></label>
                  <input type="number" min="0" max="70" class="form-control" id="weight" placeholder="0 lbs"
                    v-model="data.weight">
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="card mb-4">
                <div class="card-header bg-secondary">
                  <h4 class="text-primary mb-0">Sender Address</h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="sender_name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="sender_name" placeholder="Name"
                        v-model="data.sender_address.name">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_company" class="form-label">Company <span
                          class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="sender_company" placeholder="Company"
                        v-model="data.sender_address.company">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_street" class="form-label">Street </label>
                      <input type="text" class="form-control" id="sender_street" placeholder="Street"
                        v-model="data.sender_address.street">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_street_2" class="form-label">Street 2 <span
                          class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="sender_street_2" placeholder="Street 2"
                        v-model="data.sender_address.street_2">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_zip" class="form-label">Zip</label>
                      <input type="number" class="form-control" id="sender_zip" placeholder="Zip"
                        v-model="data.sender_address.zip">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_state" class="form-label">State</label>
                      <select class="form-select" id="sender_state" v-model="data.sender_address.state">
                        <option selected disabled></option>
                        <option value="state1">state1</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_city" class="form-label">City</label>
                      <input type="text" class="form-control" id="sender_city" placeholder="City"
                        v-model="data.sender_address.city">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_country" class="form-label">Country</label>
                      <select class="form-select" id="sender_country" v-model="data.sender_address.country">
                        <option selected disabled></option>
                        <option value="country1">country1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header bg-secondary">
                  <h4 class="text-primary mb-0">Receiver Address</h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name" placeholder="Name"
                        v-model="data.receiver_address.name">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="company" class="form-label">Company <span
                          class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="company" placeholder="Company"
                        v-model="data.receiver_address.company">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="street" class="form-label">Street </label>
                      <input type="text" class="form-control" id="street" placeholder="Street"
                        v-model="data.receiver_address.street">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="street_2" class="form-label">Street 2 <span
                          class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="street_2" placeholder="Street 2"
                        v-model="data.receiver_address.street_2">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="zip" class="form-label">Zip</label>
                      <input type="number" class="form-control" id="zip" placeholder="Zip"
                        v-model="data.receiver_address.zip">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="state" class="form-label">State</label>
                      <select class="form-select" id="state" v-model="data.receiver_address.state">
                        <option selected disabled></option>
                        <option value="state1">state1</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="city" class="form-label">City</label>
                      <input type="text" class="form-control" id="city" placeholder="City"
                        v-model="data.receiver_address.city">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="country" class="form-label">Country</label>
                      <select class="form-select" id="country" v-model="data.receiver_address.country">
                        <option selected disabled></option>
                        <option value="country1">country1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-primary font-bold text-white px-4 fs-5 rounded" @click="submitData">Generate
              Label</button>
          </div>
        </div>
      </div>
    </div>
</div></template>