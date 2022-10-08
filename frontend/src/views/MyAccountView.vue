<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Minha conta</h1>
      </div>

      <div class="column is-12">
        <button @click="logout" class="button is-danger">
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePageStore } from '../stores/page';

const storePage = usePageStore()
const router = useRouter()

function logout() {
  axios.defaults.headers.common["Authorization"] = ""

  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("userid")

  storePage.removeToken()

  router.push('/')
}

onMounted(() => {
  document.title = "Minha conta | Lojas Pedro"
})
</script>