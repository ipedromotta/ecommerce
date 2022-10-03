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

    <div class="column is-3" v-for="produto in ultimosProdutos" :key="produto.id">
      <div class="box">
        <figure class="image mb-4">
          <img :src="produto.get_thumbnail" alt="thumbnail">
        </figure>

        <h3 class="is-size-4">{{ produto.name }}</h3>
        <p class="is-size-6 has-text-gray">R${{ produto.price }}</p>

        <RouterLink :to="produto.get_absolute_url" class="button is-dark mt-4">Ver detalhes</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';
import { usePageStore } from '../stores/page';

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

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-bottom: -1.25rem;
}

</style>