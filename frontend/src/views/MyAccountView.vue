<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Minha conta</h1>
      </div>

      <div class="column is-12">
        <button @click="logout" class="button is-danger">
          Sair
        </button>
      </div>

      <hr>

      <div class="column is-12">
        <h2 class="subtitle">Meus pedidos</h2>

        <OrderSummary
          v-for="order in orders"
          :key="order.id"
          :order="order" />

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '../stores/page';
import OrderSummary from '../components/OrderSummary.vue';

const storePage = usePageStore()
const router = useRouter()
const orders = ref([])

function logout() {
  axios.defaults.headers.common["Authorization"] = ""

  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("userid")

  storePage.removeToken()

  router.push('/')
}

async function getMyOrders() {
  storePage.setIsLoading(true)

  await axios.get('/api/v1/orders/')
    .then((res) => {
      orders.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })

  storePage.setIsLoading(false)
}

onMounted(() => {
  document.title = "Minha conta | Lojas Pedro"

  getMyOrders()
})
</script>