<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Busca</h1>
        <h2 class="is-size-5 has-text-grey">Termo da busca: {{ query }}</h2>
      </div>

      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProductBox from '../components/ProductBox.vue';
import { usePageStore } from '../stores/page';

const products = ref([])
const query = ref('')
const router = useRouter()
const pageStore = usePageStore()

async function performSearch() {
  pageStore.setIsLoading(true)

  await axios.post('/api/v1/products/search/', {'query': query.value})
    .then((res) => {
      products.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })

  pageStore.setIsLoading(false)
}

onMounted(() => {
  document.title = 'Busca | Lojas Pedro'
  query.value = router.currentRoute.value.query.query
  performSearch()
})
</script>