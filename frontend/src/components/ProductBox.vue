<template>
  <div class="column is-3">
      <div class="box">
        <figure class="image mb-4">
          <img :src="props.product.get_thumbnail" alt="thumbnail">
        </figure>

        <h3 class="is-size-4">{{ props.product.name }}</h3>
        <p class="is-size-6 has-text-gray">R${{ props.product.price }}</p>

        <RouterLink :to="props.product.get_absolute_url" class="button is-dark mt-4">Ver detalhes</RouterLink>
      </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
  product: Object
})

watch(() => router.currentRoute.value.name, () => {
  console.log('funfou')
})
</script>

<style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-bottom: -1.25rem;
  }
  
</style>