import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
  const cart = ref({
    items: [],
  })
  const isAuthenticated = ref(false)
  const token = ref('')
  const isLoading = ref(false)

  function initializeStore() {
    if (localStorage.getItem('cart')) {
      cart.value = JSON.parse(localStorage.getItem('cart'))
    } else {
      localStorage.setItem('cart', JSON.stringify(cart.value))
    }
  }

  function addToCart(item) {
    const exists = ref(cart.value.items.filter(i => i.product.id === item.product.id))

    if (exists.length) {
      exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
    } else {
      cart.value.items.push(item)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const carrinhoTotal = computed(() => {
    const carrinhoTotalItens = ref(0)

    for (let i = 0; i < cart.value.items.length; i++) {
      carrinhoTotalItens.value += cart.value.items[i].quantity
    }

    return carrinhoTotalItens.value
  })

  return { initializeStore, addToCart, carrinhoTotal }
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }
})
