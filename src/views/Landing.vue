<template>
  <div class="landing pb-5">
    <div class="bg-primary bg-gradient d-flex align-items-center banner mb-5">
      <div class="container">
        <p class="mb-1 font-medium">WELCOME TO THE 2024 NEXT BIG OPPUTUNITY</p>
        <h1 class="font-bold mb-4">START YOUR FREE AMAZON STORE TODAY</h1>
        <a href="#plans" class="btn btn-secondary rounded-pill font-bold px-5 py-2 shadow">See Plans</a>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center margin-bottom">
        <div class="col-lg-5 mb-3">
          <img src="@/assets/img/pexels-tiger-lily-4483610.jpg" alt="Image" class="img-fluid shadow rounded">
        </div>
        <div class="col-lg-7 mb-3">
          <p class="font-medium text-primary">MISSION AND PHILOSOPHY</p>
          <h3 class="font-bold">OUR MISSION</h3>
          <p>At Ecomfulfil, we are dedicated to revolutionizing e-commerce logistics. Our mission is to provide DFY e-commerce service, empowering businesses with seamless fulfillment solutions. Committed to innovation, efficiency, and sustainability, we aim to be the trusted partner that propels business to new heights in the dynamic world of online commerce.</p>
        </div>
      </div>
      <div>
        <div class="text-center mb-4">
          <p class="font-medium text-primary">UNIQUE BENEFITS</p>
          <h2 class="font-bold">What We're Offering</h2>
        </div>
        <div class="row justify-content-center" id="plans">
          <div class="col-lg-5 col-md-6 mb-3">
            <div class="card shadow border-0">
              <div class="card-body text-center">
                <img src="@/assets/img/boxes.png" alt="Boxes" width="230" height="230" class=" mb-3">
                <h5>DFY ECOMMERCE STORES</h5>
                <p class="font-light mb-4">Whether it is AMAZON, WALMART, ETSY, or TikTok, we help you generate profits with our proven 4-Tier Automation, while you can enjoy a luxurious life.</p>
                  <button class="btn btn-primary font-bold rounded-pill px-5 text-white shadow">Order Service</button>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-6 mb-3">
            <div class="card shadow border-0">
              <div class="card-body text-center">
                <img src="@/assets/img/truck.png" alt="Deliver" width="230" height="230" class=" mb-3">
                <h5>FLAT SHIPPING LABELS</h5>
                <p class="font-light mb-4">We understand the shipping charges eat 30% to 50% of the profit margins hence we are offering $5 flat shipping all over the USA for up to 30 lbs.</p>
                  <router-link to="/generate-label" class="btn btn-primary font-bold rounded-pill px-5 text-white shadow">Order Label</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div></template>
<style lang="scss" scoped>.landing {
  .banner {
    min-height: 60vh;
  }

  .margin-bottom {
    margin-bottom: 6rem;
  }
}</style>