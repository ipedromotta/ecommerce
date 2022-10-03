<script setup>
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import Loading from './components/Loading.vue';
</script>

<template>
  <div class="wrapper">
    <Header/>
    <Loading/>
    <section class="section">
      <RouterView />
    </section>
    <Footer/>
  </div>
</template>

