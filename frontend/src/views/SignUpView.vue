<template>
  <div class="page-sign-up">
    	<div class="columns">
        <div class="column is-4 is-offset-4">
          <h1 class="title">Cadastre-se</h1>

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

            <div class="field">
              <label>Confirme sua senha</label>
              <div class="control">
                <input type="password" class="input" v-model="info.password2">
              </div>
            </div>

            <div class="notification is-danger" v-if="info.errors.length">
              <p v-for="error in info.errors" :key="error">{{ error }}</p>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-dark">Cadastrar</button>
              </div>
            </div>

            <hr>
            Ou <RouterLink to="/login">Clique aqui</RouterLink> para logar
          </form>
        </div>
      </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { toast } from 'bulma-toast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const info = ref({
  username: '',
  password: '',
  password2: '',
  errors: []
})

function submitForm(){
  info.value.errors = []

  if (info.value.username === '') {
    info.value.errors.push('Digite um usuário')
  }

  if (info.value.password.length < 8) {
    info.value.errors.push('Use 8 caracteres ou mais para sua senha')
  }

  if (info.value.password2 !== info.value.password) {
    info.value.errors.push('As senhas não são iguais. Tente novamente.')
  }

  if (!info.value.errors.length) {
    const formData = {
      username: info.value.username,
      password: info.value.password
    }

    axios.post("/api/v1/users/", formData)
      .then((res) => {
        toast({
          message: 'Conta criada!',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })

        router.push('/login')
      })
      .catch((error) => {
        if (error.response) {
          for (const property in error.response.data) {
            info.value.errors.push(`${property}: ${error.response.data[property]}`)
          }

          console.log(JSON.stringify(error.response.data))
        } else if (error.message) {
          info.value.errors.push('Algo deu errado. Por favor tente novamente.')

          console.log(JSON.stringify(error))
        }
      })
  }
}

onMounted(() => {
  document.title = 'Cadastre-se | Lojas Pedro'
})

</script>