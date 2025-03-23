<template>
  <div class="mainPoster">
    <div class="poster-left">
      <UITItile text="С возвращением, Иван!"  size="large" color="#fff"/>
      <UITItile text="Проходи курсы вместе с KnowFlow и не теряй баллы опыта" size="medium" color="#fff"/>
      <UIButton variant="secondary" class="poster-button" label="К просмотру" size="small" colorText="#678AD6"/>
    </div>
    <img
        src="@/assets/icons/mainPoster.svg"
        alt="icon"
        class="mainposter-svg"
    />
  </div>
</template>

<script setup lang="ts">
import UITItile from "@/UI/UITItile.vue";
import UIButton from "@/UI/UIButton.vue";
</script>

<style scoped>
.mainPoster {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1050px;
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
@media screen and (max-width: 1440px) {
  .mainposter-svg{
    display: none;
  }

}
</style>