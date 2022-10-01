<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item"><strong>Loja Pedros</strong></RouterLink>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-end">
          <RouterLink to="/verao" class="navbar-item">Verão</RouterLink>
          <RouterLink to="/inverno" class="navbar-item">Inverno</RouterLink>

          <div class="navbar-item">
            <div class="buttons">
              <RouterLink to="/log-in" class="button is-light">Entrar</RouterLink>
              <RouterLink to="/carrinho" class="button is-sucess">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Carrinho</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
