<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          {{ category.name}}
        </h2>
      </div>

      <ProductBox
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
      
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { toast } from 'bulma-toast';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '../stores/page';
import ProductBox from '../components/ProductBox.vue';

const router = useRouter()
const pageStore = usePageStore()
const category = ref({
  products: []
})

async function getCategory(){
  const categorySlug = router.currentRoute.value.params.category_slug

  pageStore.setIsLoading(true)

  await axios.get(`/api/v1/products/${categorySlug}`)
    .then((res) => {
      category.value = res.data

      document.title = category.value.name + ' | Lojas Pedro'
    })
    .catch((error) => {
      console.log(error)

      toast({
        message: 'Algo deu errado. Por favor tente de novo.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      })
    })

  pageStore.setIsLoading(false)

}

onMounted(() => {
  getCategory()
})

watch(() => router.currentRoute.value.path, () => {
  getCategory()
})

</script>