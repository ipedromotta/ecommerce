<template>
  <tr>
    <td><RouterLink :to="props.initialItem.product.get_absolute_url">{{ props.initialItem.product.name }}</RouterLink></td>
    <td>R$ {{ props.initialItem.product.price }}</td>
    <td>
      {{ props.initialItem.quantity }}
      <a @click="decrementQuantity(props.initialItem)">-</a>
      <a @click="incrementQuantity(props.initialItem)">+</a>
    </td>
    <td>R$ {{ getItemTotal(props.initialItem).toFixed(2) }}</td>
    <td><button class="delete" @click="pageStore.removeFromCart(props.initialItem)"></button></td>
  </tr>
</template>

<script setup>
import { usePageStore } from '../stores/page';


const pageStore = usePageStore()
const props = defineProps({
  initialItem: Object
})

function getItemTotal(item) {
  return item.quantity * item.product.price
}

function decrementQuantity(item) {
  item.quantity -= 1

  if (item.quantity === 0) {
    pageStore.removeFromCart(item)
  }

  updateCart()
}

function incrementQuantity(item) {
  item.quantity += 1
  updateCart()
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(pageStore.cart))
}

</script>