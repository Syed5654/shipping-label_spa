<script setup>
import Api from '@/assets/js/Api'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const userId = store.state.user.id
const accessToken = store.state.user.accessToken
const orderHistory = ref([])

onMounted(() => {
  getOrderHistory()
  getWarehouseHistory()
})

const getOrderHistory = async () => {
  try {
    await Api.post(`get-history`, { userId: userId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => {
      orderHistory.value = res.data.orderHistory
    })

  } catch (error) {
    console.log('Internal Server Error', error);
  }
}

const warehouseOrderHistory = ref([])
const getWarehouseHistory = async () => {
  try {
    await Api.post('get-warehouse-history', { userId: userId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res)=> {
      warehouseOrderHistory.value = res.data.warehouseOrderHistory
    })
  } catch (error) {
    console.log('Internal Server Error', error);
  }
}
</script>
<template>
  <div class="history py-5 bg-light">
    <div class="container">
      <h2 class="font-bold text-primary mb-3">Orders History</h2>
      <div class="card overflow-auto mb-4">
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
              <tr v-for="(order, index) in orderHistory" :key="index" class="align-middle">
                <td>USPS Priority Shippo</td>
                <td>{{ order.sender_name }}</td>
                <td>{{ order.receiver_name }}</td>
                <td><small>{{ order.tracking_number }}</small></td>
                <td>${{Number( order.label_price).toFixed(2) }}</td>
                <td><span class="badge bg-success">Success</span></td>
                <td><small>{{ new Date(order.createdAt).toLocaleDateString() }}, {{ new
                  Date(order.createdAt).toLocaleTimeString() }}</small></td>
                <td v-if="order.pdf"> <a :href="order.pdf" target="_blank" class="btn btn-primary"><i class="bi bi-download"></i> PDF</a></td>
                <td v-else></td>
              </tr>
              <tr v-if="orderHistory.length === 0" class="align-middle">
                <td class="text-center" colspan="8">No data Found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h2 class="font-bold text-primary mb-3">3PL Order History</h2>
      <div class="card overflow-auto">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Order Number</th>
                <th scope="col">Warehouse Handling Charges</th>
                <th scope="col">Box Charges</th>
                <th scope="col">Added</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(order, index) in warehouseOrderHistory" :key="index" class="align-middle">
                <td>{{ order.order_number }}</td>
                <td>{{ order.handling_charges }}</td>
                <td><small>{{ order.box_charges }}</small></td>
                <td><small>{{ new Date(order.createdAt).toLocaleDateString() }}, {{ new
                  Date(order.createdAt).toLocaleTimeString() }}</small></td>
              </tr>
              <tr v-if="warehouseOrderHistory.length === 0" class="align-middle">
                <td class="text-center" colspan="8">No data Found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.history {
  min-height: calc(100vh - 76px);
}</style>