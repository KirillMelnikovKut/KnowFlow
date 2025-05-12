// src/stores/courses.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api';
import type { Course } from '@/utils/types/courses';

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([]);
    const searchQuery = ref('');

    const filteredCourses = computed(() =>
        courses.value.filter(course =>
            course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );

    async function fetchCourses() {
        const response = await api.get<Course[]>('/courses/');
        courses.value = response.data;
    }

    return {
        courses,
        searchQuery,
        filteredCourses,
        fetchCourses
    };
});
