<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <section class="container">
    <Header />
    <div class="main-layout">
      <Sidebar />
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1760px;
  height: 100%;
}
.page-content {
}
.main-layout{
  display: flex;
  gap: 28px;
}
</style>
