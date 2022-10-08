<script setup>
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import Loading from './components/Loading.vue';
  import { usePageStore } from './stores/page';
  import { onMounted } from 'vue';
  import axios from 'axios';

  const pageStore = usePageStore()

  onMounted(() => {
    pageStore.initializeStore()

    if (pageStore.token) {
      axios.defaults.headers.common['Authorization'] = "Token" + pageStore.token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  })
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

