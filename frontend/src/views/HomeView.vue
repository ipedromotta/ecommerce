<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Bem Vindo a Lojas Pedro
        </p>
        <p class="subtitle">
          A melhor loja de roupas online
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Ultimos produtos
        </h2>
      </div>
    </div>

    <ProductBox
      v-for="product in ultimosProdutos"
      :key="product.id"
      :product="product"
    />
    
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { usePageStore } from '../stores/page';
import ProductBox from '../components/ProductBox.vue';

const ultimosProdutos = ref([])
const pageStore = usePageStore()

async function obterUltimosProdutos() {
  pageStore.setIsLoading(true)

  await axios.get('/api/v1/latest-products')
    .then((res) => {
      ultimosProdutos.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
  
  pageStore.setIsLoading(false)
}

onMounted(() =>{
  document.title = 'Lojas Pedro'
  
  obterUltimosProdutos()
  // pageStore.initializeStore()
})

</script>
