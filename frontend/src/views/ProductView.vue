<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mb-6">
          <img :src="produto.get_image" alt="thumbnail">
        </figure>

        <h1 class="title">
          {{ produto.name }}
        </h1>

        <p>
          {{ produto.description}}
        </p>
      </div>

      <div class="column is-3">
        <h2 class="subtitle">Informação</h2>

        <p><strong>Preço: </strong>R$ {{ produto.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantidade">
          </div>
        </div>

        <div class="control">
          <a class="button is-dark" @click="addToCart">Adicionar ao carrinho</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '../stores/page';
import { toast } from 'bulma-toast';


const produto = ref({})
const quantidade = ref(1)
const router = useRouter()
const pageStore = usePageStore()

async function obterProdutos() {
  pageStore.setIsLoading(true)
  const category_slug = router.currentRoute.value.params.category_slug
  const product_slug = router.currentRoute.value.params.product_slug

  await axios.get(`api/v1/products/${category_slug}/${product_slug}`)
    .then((res) => {
      produto.value = res.data

      document.title = produto.value.name + ' | Lojas Pedro'
    })
    .catch((error) => {
      console.log(error)
    })
  
  pageStore.setIsLoading(false)
}

function addToCart() {
  if (isNaN(quantidade.value) || quantidade.value < 1) {
    quantidade.value = 1
  }

  const item = {
    product: produto.value,
    quantity: quantidade.value
  }

  pageStore.addToCart(item)

  toast({
    message: 'O produto foi adicionado ao carrinho',
    type: 'is-success',
    dismissible: true,
    pauseOnHover: true,
    duration: 2000,
    position: 'bottom-right',
  })
}

onMounted(() => {
  obterProdutos()
})

</script>