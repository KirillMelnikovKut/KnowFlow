<template>
  <div class="header">
    <UIButton label="KnowFlow" variant="transparent" icon="logo.svg" icon-right tag="h1" size="large" colorText="#07286F" />
    <div class="search">
      <UIInput icon="search.svg" placeholder="Search..." />
      <UIButton label="Найти" size="small" colorText="#fff" />
    </div>
    <div class="profile-info">
      <div class="navbar">
        <UIButton variant="transparent" icon="notification.svg" />
        <UIButton variant="transparent" icon="settings.svg" />
      </div>
      <div class="profile-info__user">
        <div class="profile-name">
          <UITItile text="Иван Иванов" tag="h2" size="medium" color="#07286F" />
          <UITItile text="Студент группы А" tag="h5" size="small" color="#678AD6" />
        </div>
        <UIButton variant="transparent" icon="profileUnknown.svg" icon-size="64px"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIButton from "@/UI/UIButton.vue";
import UITItile from "@/UI/UITItile.vue";
import UIInput from "@/UI/UIInput.vue";
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
}
.search{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 60%;
}
.navbar{
  display: flex;
  align-items: center;
  gap: 8px;
}
.profile-info{
  display: flex;
  align-items: center;
  gap: 16px;
}
.profile-name{
  text-align: right;
}
.profile-info__user{
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>