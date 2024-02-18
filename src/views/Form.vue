<script setup>
import Api from "@/assets/js/Api";
import { onMounted, ref } from "vue";
import { Modal, Toast } from "bootstrap";
import { useStore } from "vuex";

const loading = ref(false);
const pdfLink = ref("");
const store = useStore();
const userId = store.state.user.id;
const trackingNumber = ref("");
const promoLoading = ref(false);
const promoCodeError = ref("");
const validPromoCode = ref(true);
const reducePrice = ref(false)

const data = ref({
  userId: userId,
  weight: "",
  promo_code: "",
  sender_name: "",
  sender_company: "",
  sender_street: "",
  sender_street_2: "",
  sender_zip: "",
  sender_state: "",
  sender_city: "",
  sender_country: "",
  receiver_name: "",
  receiver_company: "",
  receiver_street: "",
  receiver_street_2: "",
  receiver_zip: "",
  receiver_state: "",
  receiver_city: "",
  receiver_country: "",
});

const validation_message = ref({
  weight: "",
  sender_name: "",
  sender_company: "",
  sender_street: "",
  sender_street_2: "",
  sender_zip: "",
  sender_state: "",
  sender_city: "",
  sender_country: "",
  receiver_name: "",
  receiver_company: "",
  receiver_street: "",
  receiver_street_2: "",
  receiver_zip: "",
  receiver_state: "",
  receiver_city: "",
  receiver_country: "",
});

const submitData = () => {
  loading.value = true;
  if (validPromoCode.value) {
    try {
      Api.post("order-label", data.value, {
        headers: {
          Authorization: `Bearer ${store.state.user.accessToken}`,
        },
      }).then((res) => {
        if (res.data.validation_message) {
          loading.value = false;
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
          return;
        } else if (res.data.balance_error) {
          loading.value = false;
          resetValidation();
          const balanceModal = new Modal(
            document.getElementById("insufficientBalanceModal")
          );
          balanceModal.show();
          return;
        } else {
          pdfLink.value = res.data.pdf;
          trackingNumber.value = res.data.tracking_number;
          resetValidation();
          downloadPDF();
          success();
          loading.value = false;
          const modal = new Modal(document.getElementById("successModal"));
          modal.show();
        }
      });
    } catch (error) {
      console.log("Internal Server Error", error);
      loading.value = false;
      const toast = new Toast(document.getElementById("errorToast"));
      toast.show();
    }
  } else {
    loading.value = false;
    document.getElementById("promo_code").focus()
  }
};

const downloadPDF = async () => {
  try {
    const response = await fetch(pdfLink.value);
    const pdfName = pdfLink.value.split("/").pop();
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

const success = () => {
  data.value = {
    userId: userId,
    weight: "",
    sender_name: "",
    sender_company: "",
    sender_street: "",
    sender_street_2: "",
    sender_zip: "",
    sender_state: "",
    sender_city: "",
    sender_country: "",
    receiver_name: "",
    receiver_company: "",
    receiver_street: "",
    receiver_street_2: "",
    receiver_zip: "",
    receiver_state: "",
    receiver_city: "",
    receiver_country: "",
  };

  dimensions.value = {
    height: '',
    length: '',
    width: ''
  }
};

const resetValidation = () => {
  validation_message.value = {
    weight: "",
    sender_name: "",
    sender_company: "",
    sender_street: "",
    sender_street_2: "",
    sender_zip: "",
    sender_state: "",
    sender_city: "",
    sender_country: "",
    receiver_name: "",
    receiver_company: "",
    receiver_street: "",
    receiver_street_2: "",
    receiver_zip: "",
    receiver_state: "",
    receiver_city: "",
    receiver_country: "",
  };
};

const dimensions = ref({
  height: '',
  length: '',
  width: ''
})

const hideBalanceModal = () => {
  const balanceModal = Modal.getInstance(
    document.getElementById("insufficientBalanceModal")
  );
  balanceModal.hide();
};

const validatePromoCode = () => {
  promoLoading.value = true;
  let promoField = document.getElementById("promo_code");
  promoField.addEventListener("input", () => {
    if (promoField.value.trim() === "") {
      promoField.classList.remove("is-invalid");
      promoField.classList.remove("is-valid");
    }
  });
  if (data.value.promo_code.trim() !== "") {
    Api.post("promocode", { promo_code: data.value.promo_code }).then((res) => {
      if (res.data.error) {
        validPromoCode.value = false;
        reducePrice.value = false
        promoCodeError.value = res.data.message;
        promoField.classList.remove("is-valid");
        promoField.classList.add("is-invalid");
        promoField.focus();
        promoLoading.value = false;
      } else {
        validPromoCode.value = true;
        promoCodeError.value = "";
        reducePrice.value = true
        promoField.classList.remove("is-invalid");
        promoField.classList.add("is-valid");
        promoLoading.value = false;
      }
    });
  } else {
    reducePrice.value = false
    validPromoCode.value = true;
    promoLoading.value = false;
    promoCodeError.value = "";
  }
};

const allowOnlyNumberSenderZip = (event) => {
  if (event.code !== 'Digit0' && event.code !== 'Digit1' && event.code !== 'Digit2' && event.code !== 'Digit3' && event.code !== 'Digit4' && event.code !== 'Digit5' && event.code !== 'Digit6' && event.code !== 'Digit7' && event.code !== 'Digit8' && event.code !== 'Digit9' && event.code !== 'Minus' && event.code !== 'Backspace' && event.code !== 'ArrowUp' && event.code !== 'ArrowDown' && event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    event.preventDefault();
  }
}

const allowOnlyNumberReceiverZip = (event) => {
  if (event.code !== 'Digit0' && event.code !== 'Digit1' && event.code !== 'Digit2' && event.code !== 'Digit3' && event.code !== 'Digit4' && event.code !== 'Digit5' && event.code !== 'Digit6' && event.code !== 'Digit7' && event.code !== 'Digit8' && event.code !== 'Digit9' && event.code !== 'Minus' && event.code !== 'Backspace' && event.code !== 'ArrowUp' && event.code !== 'ArrowDown' && event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    event.preventDefault();
  }
}


onMounted(()=>{
  window.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter'){
      submitData()
    }
  })
})
</script>
<template>
  <div class="py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <h1 class="text-primary mb-3 font-bold text-center">
            Generate Order Label
          </h1>
          <div class="card mb-4">
            <div class="card-header bg-secondary">
              <h4 class="text-primary mb-0">Package Details</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="weight" class="form-label mb-2">Available Courier:</label>
                  <br />
                  <div class="d-inline-block border border-2 border-success rounded-4 p-3 position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      <i class="bi bi-check-lg fs-6"></i>
                    </span>
                    <img src="@/assets/img/usps.svg" alt="USPS" class="img-fluid" width="100" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="weight" class="form-label fs-5">Weight
                    <span class="text-black-50 fst-italic">(70.00 lbs max)</span></label>
                  <input type="number" min="0" max="70" class="form-control" id="weight" placeholder="0 lbs"
                    v-model="data.weight" />
                  <small class="text-danger" v-for="message of validation_message.weight" :key="`${message}-weight`">{{
                    message }}</small>
                </div>
                <div class="col-12 mb-3">
                  <div class="d-flex align-items-center gap-2">
                    <p class="mb-0 fs-5 font-light">Label Price:</p>
                    <p class="mb-0 fs-5" v-if="data.weight < 30">{{ reducePrice ? "$4.00" : "$5.00" }}</p>
                    <p class="mb-0 fs-5" v-else>{{ reducePrice ? "$4.00" : "$10.00" }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex align-items-center mb-2">
                    <label for="promo_code" class="form-label me-3 mb-0">PromoCode
                      <span class="text-black-50 fst-italic">(Optional)</span></label>
                    <div class="spinner-border spinner-border-sm" role="status" v-if="promoLoading">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <input type="text" class="form-control text-uppercase" id="promo_code" v-model="data.promo_code"
                    @input="validatePromoCode" />
                  <small class="text-danger" v-if="promoCodeError">{{
                    promoCodeError
                  }}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header bg-secondary">
              <h4 class="text-primary mb-0">Dimensions</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="length" class="form-label">Length (in)</label>
                  <input type="number" class="form-control" id="length" placeholder="0.00 in"
                    v-model="dimensions.length" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="width" class="form-label">Width (in)</label>
                  <input type="number" class="form-control" id="width" placeholder="0.00 in" v-model="dimensions.width" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="height" class="form-label">Height (in)</label>
                  <input type="number" class="form-control" id="height" placeholder="0.00 in"
                    v-model="dimensions.height" />
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
                        v-model="data.sender_name" />
                      <small class="text-danger" v-for="message of validation_message.sender_name"
                        :key="`${message}-sender_name`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_company" class="form-label">Company
                        <span class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="sender_company" placeholder="Company"
                        v-model="data.sender_company" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_street" class="form-label">Street
                      </label>
                      <input type="text" class="form-control" id="sender_street" placeholder="Street"
                        v-model="data.sender_street" />
                      <small class="text-danger" v-for="message of validation_message.sender_street"
                        :key="`${message}-sender_street`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_street_2" class="form-label">Street 2
                        <span class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="sender_street_2" placeholder="Street 2"
                        v-model="data.sender_street_2" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_zip" class="form-label">Zip</label>
                      <input type="text" class="form-control" id="sender_zip" placeholder="Zip" v-model="data.sender_zip"
                        @keydown="allowOnlyNumberSenderZip" />
                      <small class="text-danger" v-for="message of validation_message.sender_zip"
                        :key="`${message}-sender_zip`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_state" class="form-label">State</label>
                      <select class="form-select" id="sender_state" v-model="data.sender_state">
                        <option selected disabled>Select State</option>
                        <option value="AK">Alaska (AK)</option>
                        <option value="AL">Alabama (AL)</option>
                        <option value="APO">Army Post Office (APO)</option>
                        <option value="AR">Arkansas (AR)</option>
                        <option value="AZ">Arizona (AZ)</option>
                        <option value="CA">California (CA)</option>
                        <option value="CO">Colorado (CO)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="DC">District Of Columbia (DC)</option>
                        <option value="DE">Delaware (DE)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="HI">Hawaii (HI)</option>
                        <option value="IA">Iowa (IA)</option>
                        <option value="ID">Idaho (ID)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="IN">Indiana (IN)</option>
                        <option value="KS">Kansas (KS)</option>
                        <option value="KY">Kentucky (KY)</option>
                        <option value="LA">Louisiana (LA)</option>
                        <option value="MA">Massachusetts (MA)</option>
                        <option value="MD">Maryland (MD)</option>
                        <option value="ME">Maine (ME)</option>
                        <option value="MI">Michigan (MI)</option>
                        <option value="MN">Minnesota (MN)</option>
                        <option value="MO">Missouri (MO)</option>
                        <option value="MS">Mississippi (MS)</option>
                        <option value="MT">Montana (MT)</option>
                        <option value="NC">North Carolina (NC)</option>
                        <option value="ND">North Dakota (ND)</option>
                        <option value="NE">Nebraska (NE)</option>
                        <option value="NH">New Hampshire (NH)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="NM">New Mexico (NM)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="OH">Ohio (OH)</option>
                        <option value="OK">Oklahoma (OK)</option>
                        <option value="OR">Oregon (OR)</option>
                        <option value="PA">Pennsylvania (PA)</option>
                        <option value="PR">Puerto Rico (PR)</option>
                        <option value="RI">Rhode Island (RI)</option>
                        <option value="SC">South Carolina (SC)</option>
                        <option value="SD">South Dakota (SD)</option>
                        <option value="TN">Tennessee (TN)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="UT">Utah (UT)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="VT">Vermont (VT)</option>
                        <option value="WA">Washington (WA)</option>
                        <option value="WI">Wisconsin (WI)</option>
                        <option value="WV">West Virginia (WV)</option>
                        <option value="WY">Wyoming (WY)</option>
                        <option value="AB">Alberta (AB)</option>
                        <option value="BC">British Columbia (BC)</option>
                        <option value="MB">Manitoba (MB)</option>
                        <option value="NB">New Brunswick (NB)</option>
                        <option value="NL">
                          Newfoundland and Labrador (NL)
                        </option>
                        <option value="NS">Nova Scotia (NS)</option>
                        <option value="NT">Northwest Territories (NT)</option>
                        <option value="NU">Nunavut (NU)</option>
                        <option value="ON">Ontario (ON)</option>
                        <option value="PE">Prince Edward Island (PE)</option>
                        <option value="QC">Quebec (QC)</option>
                        <option value="SK">Saskatchewan (SK)</option>
                        <option value="YT">Yukon (YT)</option>
                      </select>
                      <small class="text-danger" v-for="message of validation_message.sender_state"
                        :key="`${message}-sender_state`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_city" class="form-label">City</label>
                      <input type="text" class="form-control" id="sender_city" placeholder="City"
                        v-model="data.sender_city" />
                      <small class="text-danger" v-for="message of validation_message.sender_city"
                        :key="`${message}-sender_city`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="sender_country" class="form-label">Country</label>
                      <select class="form-select" id="sender_country" v-model="data.sender_country">
                        <option selected disabled>Select a country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="CV">Cabo Verde</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CD">
                          Congo, Democratic Republic of the
                        </option>
                        <option value="CG">Congo, Republic of the</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="SZ">Eswatini</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GR">Greece</option>
                        <option value="GD">Grenada</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HN">Honduras</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea, North</option>
                        <option value="KR">Korea, South</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="MK">North Macedonia</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestine</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US" selected="">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VA">Vatican City</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                      <small class="text-danger" v-for="message of validation_message.sender_country"
                        :key="`${message}-sender_country`">{{ message }}</small>
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
                      <label for="receiver_name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="receiver_name" placeholder="Name"
                        v-model="data.receiver_name" />
                      <small class="text-danger" v-for="message of validation_message.receiver_name"
                        :key="`${message}-receiver_name`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_company" class="form-label">Company
                        <span class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="receiver_company" placeholder="Company"
                        v-model="data.receiver_company" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_street" class="form-label">Street
                      </label>
                      <input type="text" class="form-control" id="receiver_street" placeholder="Street"
                        v-model="data.receiver_street" />
                      <small class="text-danger" v-for="message of validation_message.receiver_street"
                        :key="`${message}-receiver_street`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_street_2" class="form-label">Street 2
                        <span class="text-black-50 fst-italic">(Optional)</span></label>
                      <input type="text" class="form-control" id="receiver_street_2" placeholder="Street 2"
                        v-model="data.receiver_street_2" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_zip" class="form-label">Zip</label>
                      <input type="text" class="form-control" id="receiver_zip" placeholder="Zip"
                        v-model="data.receiver_zip" @keydown="allowOnlyNumberReceiverZip" />
                      <small class="text-danger" v-for="message of validation_message.receiver_zip"
                        :key="`${message}-receiver_zip`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_state" class="form-label">State</label>
                      <select class="form-select" id="receiver_state" v-model="data.receiver_state">
                        <option selected disabled>Select state...</option>
                        <option value="AK">Alaska (AK)</option>
                        <option value="AL">Alabama (AL)</option>
                        <option value="APO">Army Post Office (APO)</option>
                        <option value="AR">Arkansas (AR)</option>
                        <option value="AZ">Arizona (AZ)</option>
                        <option value="CA">California (CA)</option>
                        <option value="CO">Colorado (CO)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="DC">District Of Columbia (DC)</option>
                        <option value="DE">Delaware (DE)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="HI">Hawaii (HI)</option>
                        <option value="IA">Iowa (IA)</option>
                        <option value="ID">Idaho (ID)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="IN">Indiana (IN)</option>
                        <option value="KS">Kansas (KS)</option>
                        <option value="KY">Kentucky (KY)</option>
                        <option value="LA">Louisiana (LA)</option>
                        <option value="MA">Massachusetts (MA)</option>
                        <option value="MD">Maryland (MD)</option>
                        <option value="ME">Maine (ME)</option>
                        <option value="MI">Michigan (MI)</option>
                        <option value="MN">Minnesota (MN)</option>
                        <option value="MO">Missouri (MO)</option>
                        <option value="MS">Mississippi (MS)</option>
                        <option value="MT">Montana (MT)</option>
                        <option value="NC">North Carolina (NC)</option>
                        <option value="ND">North Dakota (ND)</option>
                        <option value="NE">Nebraska (NE)</option>
                        <option value="NH">New Hampshire (NH)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="NM">New Mexico (NM)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="OH">Ohio (OH)</option>
                        <option value="OK">Oklahoma (OK)</option>
                        <option value="OR">Oregon (OR)</option>
                        <option value="PA">Pennsylvania (PA)</option>
                        <option value="PR">Puerto Rico (PR)</option>
                        <option value="RI">Rhode Island (RI)</option>
                        <option value="SC">South Carolina (SC)</option>
                        <option value="SD">South Dakota (SD)</option>
                        <option value="TN">Tennessee (TN)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="UT">Utah (UT)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="VT">Vermont (VT)</option>
                        <option value="WA">Washington (WA)</option>
                        <option value="WI">Wisconsin (WI)</option>
                        <option value="WV">West Virginia (WV)</option>
                        <option value="WY">Wyoming (WY)</option>
                        <option value="AB">Alberta (AB)</option>
                        <option value="BC">British Columbia (BC)</option>
                        <option value="MB">Manitoba (MB)</option>
                        <option value="NB">New Brunswick (NB)</option>
                        <option value="NL">
                          Newfoundland and Labrador (NL)
                        </option>
                        <option value="NS">Nova Scotia (NS)</option>
                        <option value="NT">Northwest Territories (NT)</option>
                        <option value="NU">Nunavut (NU)</option>
                        <option value="ON">Ontario (ON)</option>
                        <option value="PE">Prince Edward Island (PE)</option>
                        <option value="QC">Quebec (QC)</option>
                        <option value="SK">Saskatchewan (SK)</option>
                        <option value="YT">Yukon (YT)</option>
                      </select>
                      <small class="text-danger" v-for="message of validation_message.receiver_state"
                        :key="`${message}-receiver_state`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_city" class="form-label">City</label>
                      <input type="text" class="form-control" id="receiver_city" placeholder="City"
                        v-model="data.receiver_city" />
                      <small class="text-danger" v-for="message of validation_message.receiver_city"
                        :key="`${message}-receiver_city`">{{ message }}</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="receiver_country" class="form-label">Country</label>
                      <select class="form-select" id="receiver_country" v-model="data.receiver_country">
                        <option selected disabled>Select a country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="CV">Cabo Verde</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CD">
                          Congo, Democratic Republic of the
                        </option>
                        <option value="CG">Congo, Republic of the</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="SZ">Eswatini</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GR">Greece</option>
                        <option value="GD">Grenada</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HN">Honduras</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea, North</option>
                        <option value="KR">Korea, South</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="MK">North Macedonia</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestine</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US" selected="">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VA">Vatican City</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                      <small class="text-danger" v-for="message of validation_message.receiver_country"
                        :key="`${message}-receiver_country`">{{ message }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-primary font-bold text-white px-4 fs-5 rounded" @click="submitData" id="generate-btn"
              :disabled="loading">
              <div class="d-flex align-items-center">
                <div class="spinner-border me-3" role="status" v-if="loading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span>
                  {{ loading ? "Please wait" : "Order Label" }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
  <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 font-medium" id="successModalLabel">
            Label Generated!
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center py-4">
          <p class="fs-4 mb-1 font-light">
            Your Label has successfully generated.
          </p>
          <p class="mb-1 fs-5 font-medium">
            Your Tracking number is <br />
            <span class="font-bold">{{ trackingNumber }}</span>
          </p>
          <small>If the download hasn't started
            <a :href="pdfLink" target="_blank">Click here!</a></small>
        </div>
      </div>
    </div>
  </div>

  <!-- Insufficient Balance Modal -->
  <div class="modal fade" id="insufficientBalanceModal" tabindex="-1" aria-labelledby="insufficientBalanceModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 font-medium" id="insufficientBalanceModalLabel">
            Insufficient Balance!
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center py-4">
          <p class="fs-4 mb-1 font-light">
            You have insufficient balance. Please recharge your account.
          </p>
          <p class="mb-1 fs-5 font-light">
            <router-link to="/wallet" @click="hideBalanceModal">Click here</router-link>
            to recharge your account
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Error Toast -->
  <div class="error_toast position-fixed">
    <div id="errorToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive"
      aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">Something went wrong, please try again.</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
          aria-label="Close"></button>
      </div>
    </div>
  </div>

  <!-- Loader -->
  <div
    class="loader bg-dark bg-opacity-75 text-white position-fixed top-0 left-0 vh-100 w-100 d-flex align-items-center justify-content-center"
    v-if="loading">
    <div class="text-center">
      <div class="spinner-border mb-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h5>
        Please wait! <br />
        This may take some time
      </h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error_toast {
  top: 13%;
  right: 1%;
}
</style>
