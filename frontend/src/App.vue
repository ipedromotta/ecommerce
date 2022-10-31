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

<script setup>
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import Loading from './components/Loading.vue';
  import { usePageStore } from './stores/page';
  import { onMounted } from 'vue';

  const pageStore = usePageStore()

  onMounted(() => {
    pageStore.initializeStore()
  })
</script>

