<template>
  <Transition name="fade">
    <section
        v-if="courses.length && visible"
        class="section-course-preview"
    >
      <div
          v-for="(course, index) in courses"
          :key="course.id"
          class="course-preview"
      >
        <div class="course-card">
          <div class="course-preview__id">
            <UITItile :text="`Курс ${index + 1}`" size="small" color="#678AD6" />
          </div>
          <UITItile class="course-preview__title" :text="course.title" size="large" color="#07286f"/>
          <UITItile class="course-preview__subtitle" :text="course.description" size="small" color="#767676" />
          <router-link
              :to="`/course/${course.id}`"
              class="course-link"
              @click="clearSearch"
          >
            Перейти к курсу
          </router-link>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, watch, ref } from 'vue';
import UITItile from '@/UI/UITItile.vue';
import { useCoursesStore } from '@/stores/courses';

interface Course {
  id: number;
  title: string;
  description?: string;
}

const props = defineProps<{
  courses: Course[];
  searchQuery: string;
}>();

const visible = ref(false);
const courseStore = useCoursesStore();

watch(() => props.searchQuery, (q) => {
  visible.value = q.trim().length > 0;
});

const clearSearch = () => {
  courseStore.searchQuery = '';
};
</script>

<style scoped>
.section-course-preview {
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4px;
}

.course-preview {
  padding: 16px;
}

.course-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.course-link {
  display: inline-block;
  text-align: center;
  margin-top: 10px;
  padding: 12px 16px;
  background: #678AD6;
  color: white;
  text-decoration: none;
  border-radius: 16px;
}

.course-preview__id {
  border: 1px solid #678AD6;
  border-radius: 16px;
  width: 70px;
  padding: 6px;
  text-align: center;
}

.course-link:hover {
  background: #0056b3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
