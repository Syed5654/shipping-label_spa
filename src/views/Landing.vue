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
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus distinctio, adipisci provident
            harum asperiores aut! Quasi voluptatibus ea facere illum, fugit magni illo reiciendis expedita, voluptatem
            tenetur ad minus nulla. Architecto, ut sint. Corporis provident aperiam fugiat laboriosam necessitatibus!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur incidunt error totam impedit odio,
            corporis aliquam. Consequatur sapiente iste earum, quis voluptates minima odio! Molestiae harum aspernatur
            deleniti reprehenderit libero repellat officia porro laborum quidem doloribus, nobis similique corporis
            laboriosam ratione maxime saepe, hic placeat tempora. Minima, illum optio, aliquam placeat natus sint
            molestias eaque molestiae enim sit a porro!</p>
          <button class="btn btn-primary font-bold px-4 rounded-pill">Learn More</button>
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos veritatis amet
                  pariatur, nesciunt commodi nihil nulla quae earum quo, necessitatibus debitis. Aperiam sunt voluptates
                  id, nostrum quia odio in!</p>
                  <button class="btn btn-primary font-bold rounded-pill px-5 text-white shadow">Order Service</button>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-6 mb-3">
            <div class="card shadow border-0">
              <div class="card-body text-center">
                <img src="@/assets/img/truck.png" alt="Deliver" width="230" height="230" class=" mb-3">
                <h5>FLAT SHIPPING LABELS</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dignissimos veritatis amet
                  pariatur, nesciunt commodi nihil nulla quae earum quo, necessitatibus debitis. Aperiam sunt voluptates
                  id, nostrum quia odio in!</p>
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