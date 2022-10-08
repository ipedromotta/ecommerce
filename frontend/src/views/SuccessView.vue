<template>
  <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Obrigado</h1>

        <p>Seu pedido será processado em 48 horas</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';


onMounted(() => {
  document.title = "Sucesso | Lojas Pedro"
})
</script>