<template>
  <div class="mainPoster">
    <div class="poster-left">
      <UITItile text="Web Development Bootcamp"  size="large" color="#fff"/>
      <UITItile text="Этот интенсивный курс по веб-разработке подходит для новичков, которые хотят научиться создавать современные сайты и веб-приложения" size="medium" color="#fff"/>
    </div>
  <img
      src="@/assets/icons/posterCourses.svg"
      alt="icon"
      class="ui-button__icon"
  />
  </div>
</template>

<script setup lang="ts">
import UITItile from "@/UI/UITItile.vue";
</script>

<style scoped>
.mainPoster {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1480px;
  width: 100%;
  max-height: 265px;
  height: 100%;
  background-color: #678AD6;
  border-radius: 15px;
}
.poster-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}
.poster-button{
  width: 152px;
}
</style>