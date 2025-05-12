<template>
  <div class="container">
    <MainPoster />
    <CoursePreview :courses="courses" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainPoster from "@/components/Posters/MainPoster.vue";
import CoursePreview from "@/components/Courses/CoursePreview.vue";
import api from "@/api";

const courses = ref([]);

const fetchCourses = async () => {
    const response = await api.get("/courses/");
    courses.value = response.data;
};

onMounted(fetchCourses);
</script>

<style scoped>
.container {
  max-width: 1110px;
  width: 100%;
  padding-bottom: 40px;
}
</style>
