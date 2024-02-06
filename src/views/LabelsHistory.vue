<template>
  <div class="history py-5 bg-light">
    <div class="container">
      <h2 class="font-bold text-primary mb-3">Orders History</h2>
      <div class="card">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Track ID</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Added</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td>USPS Priority Shippo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>123456789</td>
                <td>$5.00</td>
                <td><span class="badge bg-success">Success</span></td>
                <td>10/10/24</td>
                <td>Download</td>
              </tr>
              <tr>
                <td>USPS Priority Shippo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>123456789</td>
                <td>$5.00</td>
                <td><span class="badge bg-success">Success</span></td>
                <td>10/10/24</td>
                <td>Download</td>
              </tr>
              <tr>
                <td>USPS Priority Shippo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>123456789</td>
                <td>$5.00</td>
                <td><span class="badge bg-success">Success</span></td>
                <td>10/10/24</td>
                <td>Download</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.history{
  min-height: calc(100vh - 76px);
}
</style>