<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in cart.items" :key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>R$ {{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Detalhes da entrega</h2>
        <p class="has-text-grey mb-4">* Todos os campos que são necessários</p>
        <div class="columns is-multiline">
          <div class="column is-6">

            <div class="field">
              <label>Primeiro nome *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.first_name">
              </div>
            </div>

            <div class="field">
              <label>Ultimo nome *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.last_name">
              </div>
            </div>

            <div class="field">
              <label>E-mail *</label>
              <div class="control">
                <input type="email" class="input" v-model="info.email">
              </div>
            </div>

            <div class="field">
              <label>Telefone *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.phone">
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label>Endereço *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.address">
              </div>
            </div>

            <div class="field">
              <label>CEP *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.zipcode">
              </div>
            </div>

            <div class="field">
              <label>Referencia *</label>
              <div class="control">
                <input type="text" class="input" v-model="info.place">
              </div>
            </div>
          </div>
        </div>

        <div class="notification is-danger mt-4" v-if="info.errors.length">
            <p v-for="error in info.errors" :key="error">{{ error }}</p>
          </div>

          <hr>
          
          <div class="mb-5" id="card-element"></div>

          <template v-if="cartTotalLength">
            <hr>

            <button class="button is-dark" @click="submitForm">Realizar pagamento</button>
          </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { usePageStore } from '../stores/page';

const pageStore = usePageStore()
const cart = ref({
  items: []
})
const info = ref({
  stripe: {},
  card: {},
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  zipcode: '',
  place: '',
  errors: []
})

const cartTotalPrice = computed(() => {
  return cart.value.items.reduce((acc, curVal) => {
    return acc += curVal.product.price * curVal.quantity
  }, 0)
})

const cartTotalLength = computed(() =>{
  return cart.value.items.reduce((acc, curVal) => {
    return acc += curVal.quantity
  }, 0)
})

function getItemTotal(item) {
  return item.quantity * item.product.price
}

function submitForm() {
  info.value.errors = []

  if (info.value.first_name === '') {
    info.value.errors.push('Digite seu nome')
  }
  if (info.value.last_name === '') {
    info.value.errors.push('Digite seu sobrenome')
  }
  if (info.value.email === '') {
    info.value.errors.push('Digite seu email')
  }
  if (info.value.phone === '') {
    info.value.errors.push('Digite seu telefone')
  }
  if (info.value.address === '') {
    info.value.errors.push('Digite seu endereço')
  }
  if (info.value.zipcode === '') {
    info.value.errors.push('Digite seu CEP')
  }
  if (info.value.place === '') {
    info.value.errors.push('Digite uma referencia')
  }

  if (!info.value.errors.length) {
    pageStore.setIsLoading(true)

    info.value.stripe.createToken(info.value.card).then(result => {
      if (result.error) {
        pageStore.setIsLoading(false)

        info.value.errors.push('Algo deu errado. Por favor tente novamente')

        console.log(result.error.message)
      } else {
        stripeTokenHandler(result.token)
      }
    })


  }
}

async function stripeTokenHandler(token) {
  const items = []

  for (let i = 0; i < cart.value.items.length; i++) {
    const item = cart.value.items[i]
    const obj = {
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price * items.quantity
    }

    items.push(obj)
  }

  const data = {
    'first_name': info.value.first_name,
    'last_name': info.value.last_name,
    'email': info.value.email,
    'address': info.value.address,
    'zipcode': info.value.zipcode,
    'place': info.value.place,
    'phone': info.value.phone,
    'items': info.value.items,
    'stripe_token': token.id
  }

  console.log(data)

  await axios.post('/api/v1/checkout/', data)
    .then((res) => {
      pageStore.clearCart()

      router.push('/carrinho/sucesso')
    })
    .catch((error) => {
      info.value.errors.push('Algo deu errado. Por favor tente novamente')

      console.log(error)
    })

    pageStore.setIsLoading(false)
}

onMounted(() => {
  document.title = 'Checkout | Lojas Pedro'

  cart.value = pageStore.cart

  if (cartTotalLength.value > 0) {
    info.value.stripe = Stripe('pk_test_XKUpwPvvEnNxMsSzoLm8H3i8')
    const elements = info.value.stripe.elements()
    info.value.card = elements.create('card', { hidePostalCode: true })

    info.value.card.mount('#card-element')
  }
})
</script>