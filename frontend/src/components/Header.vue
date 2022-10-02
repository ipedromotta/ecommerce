<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item"><strong>Loja Pedros</strong></RouterLink>
      <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu }">
      <div class="navbar-end">
        <RouterLink to="/verao" class="navbar-item">Verão</RouterLink>
        <RouterLink to="/inverno" class="navbar-item">Inverno</RouterLink>

        <div class="navbar-item">
          <div class="buttons">
            <RouterLink to="/log-in" class="button is-light">Entrar</RouterLink>
            <RouterLink to="/carrinho" class="button is-success">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Carrinho ({{ pageStore.carrinhoTotal }})</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { usePageStore } from '../stores/page';

const showMobileMenu = ref(false)
const pageStore = usePageStore()

</script>