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

    if (localStorage.getItem('token')) {
      token.value = localStorage.getItem('token')
      isAuthenticated.value = true
    } else {
      token.value = ''
      isAuthenticated.value = false
    }
  }

  function setToken(tokenValue) {
    token.value = tokenValue
    isAuthenticated.value = true
  }

  function removeToken() {
    token.value = ''
    isAuthenticated.value = false
  }

  function addToCart(item) {
    const exists = cart.value.items.filter(i => i.product.id === item.product.id)

    if (exists.length) {
      exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
    } else {
      cart.value.items.push(item)
    }

    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  function removeFromCart(item) {
    cart.value.items = cart.value.items.filter(i => i.product.id !== item.product.id)
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  function clearCart() {
    cart.value = { items: [] }
    
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const carrinhoTotal = computed(() => {
    const carrinhoTotalItens = ref(0)

    for (let i = 0; i < cart.value.items.length; i++) {
      carrinhoTotalItens.value += cart.value.items[i].quantity
    }
    return carrinhoTotalItens.value
  })

  function setIsLoading(state) {
    isLoading.value = state
  }

  return { initializeStore, cart, addToCart, removeFromCart, carrinhoTotal, clearCart, setIsLoading, isLoading, token, setToken, removeToken, isAuthenticated }
})
