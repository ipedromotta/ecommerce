<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Carrinho</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <CartItem
              v-for="item in pageStore.cart.items"
              :key="item.product.id"
              :initialItem="item"
            />
          </tbody>
        </table>

        <p v-else>Você não tem nenhum produto no seu carrinho...</p>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Resumo</h2>
        <strong>R$ {{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} itens
        <hr>

        <RouterLink to="/cart/checkout" class="button is-dark">Prosseguir para o checkout</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import CartItem from '@/components/CartItem.vue'
import { usePageStore } from '../stores/page';

const pageStore = usePageStore()

onMounted(() => {
  document.title = 'Carrinho | Lojas Pedro'
})

const cartTotalLength = computed(() => {
  return pageStore.cart.items.reduce((acc, curVal) => {
    return acc += curVal.quantity
  }, 0)
})

const cartTotalPrice = computed(() => {
  return pageStore.cart.items.reduce((acc, curVal) => {
    return acc += curVal.product.price * curVal.quantity
  }, 0)
})

</script>