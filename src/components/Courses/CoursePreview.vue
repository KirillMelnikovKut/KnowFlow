<template>
  <section class="section-course-preview">
    <div v-for="(course, index) in courses" :key="course.id" class="course-preview">
      <div class="course-card">
        <div class="course-preview__id">
          <UITItile :text="`Курс ${index + 1}`" size="small" color="#678AD6" />
        </div>
        <UITItile class="course-preview__title" :text="course.title" size="large" color="#07286f"/>
        <UITItile class="course-preview__subtitle" :text="course.description" size="small" color="#767676" />
        <router-link :to="`/course/${course.id}`" class="course-link">
          Перейти к курсу
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import UITItile from "@/UI/UITItile.vue";

defineProps<{ courses: { id: number; title: string; description: string }[] }>();
</script>

<style scoped>
.section-course-preview{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.course-preview {
  display: flex;
  align-items: start;
  padding: 48px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 16px;
}
.course-card {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
}
.course-link {
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  padding: 16px 16px;
  width: 150px;
  background: #678AD6;
  color: white;
  text-decoration: none;
  border-radius: 16px;
}
.course-preview__id{
  border: 1px solid #678AD6;
  border-radius: 16px;
  width: 70px;
  padding: 10px;
  text-align: center;
}
.course-link:hover {
  background: #0056b3;
}
</style>
