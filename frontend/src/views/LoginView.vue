<template>
<div class="page-log-in">
    	<div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="title">Fazer login</h1>

          <form @submit.prevent="submitForm">
            <div class="field">
              <label>Usuario</label>
              <div class="control">
                <input type="text" class="input" v-model="info.username">
              </div>
            </div>

            <div class="field">
              <label>Senha</label>
              <div class="control">
                <input type="password" class="input" v-model="info.password">
              </div>
            </div>

            <div class="notification is-danger" v-if="info.errors.length">
              <p v-for="error in info.errors" :key="error">{{ error }}</p>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-dark">Entrar</button>
              </div>
            </div>

            <hr>
            Ou <RouterLink to="/cadastro">Clique aqui</RouterLink> se cadastrar
          </form>
        </div>
      </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '../stores/page';

const pageStore = usePageStore()
const router = useRouter()
const info = ref({
  username: '',
  password: '',
  errors: []
})

async function submitForm() {
  axios.defaults.headers.common["Authorization"] = ""

  localStorage.removeItem("token")

  const formData = {
    username: info.value.username,
    password: info.value.password
  }

  await axios.post("/api/v1/token/login/", formData)
    .then((res) => {
      const token = res.data.auth_token

      pageStore.setToken(token)

      axios.defaults.headers.common["Authorization"] = "Token" + token

      localStorage.setItem("token", token)

      const toPath = router.currentRoute.value.query.to || '/carrinho'

      router.push(toPath)
    })
    .catch((error) => {
      if (error.response) {
        for (const property in error.response.data) {
          info.value.errors.push(`${property}: ${error.response.data[property]}`)
        }
      } else {
        info.value.errors.push('Algo deu errado. Por favor tente novamente')

        console.log(JSON.stringify(error))
      }
    })
}

onMounted(() => {
  document.title = 'Entrar | Lojas Pedro'
})
</script>