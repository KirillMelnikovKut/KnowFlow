<template>
  <div class="profile-page">
    <section class="profile-info" v-if="profile">
      <p><strong>Имя:</strong> {{ profile.first_name }}</p>
      <p><strong>Фамилия:</strong> {{ profile.last_name }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
    </section>

    <section class="courses-stats" v-if="courses.length">
      <h2>Лучшие результаты по курсам</h2>

      <!-- Для каждого курса свой график -->
      <div
          class="course-chart-wrapper"
          v-for="course in courses"
          :key="course.id"
      >
        <h3>{{ course.title }}</h3>
        <canvas :id="`course-chart-${course.id}`"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import api from '@/api';

Chart.register(...registerables);

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
}

interface Block {
  id: number;
  title: string;
}

interface Course {
  id: number;
  title: string;
  blocks: Block[];
}

interface RawStatistic {
  user_id: number;
  block_id: number;
  statistics: number;
}

const profile = ref<Profile | null>(null);
const rawStats = ref<RawStatistic[]>([]);
const bestByBlock = ref<Record<number, number>>({});
const courses = ref<Course[]>([]);

const fetchProfile = async () => {
  const { data } = await api.post('/auth/me');
  profile.value = data;
};

const fetchRawStats = async () => {
  const { data } = await api.get<RawStatistic[]>('/statistics');
  rawStats.value = data;
  const best: Record<number, number> = {};
  rawStats.value.forEach(s => {
    const prev = best[s.block_id] || 0;
    best[s.block_id] = Math.max(prev, s.statistics);
  });
  bestByBlock.value = best;
};

const fetchCourses = async () => {
  const { data } = await api.get<Course[]>('/courses/');
  courses.value = data;
};

const renderCharts = async () => {
  await nextTick();
  courses.value.forEach(course => {
    const ctx = document.getElementById(`course-chart-${course.id}`) as HTMLCanvasElement;
    if (!ctx) return;
    const labels = course.blocks.map(b => b.title);
    const data = course.blocks.map(b => bestByBlock.value[b.id] ?? 0);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Оценка (из 5)',
          data,
          backgroundColor: '#3498db',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 800 },

        layout: {
          padding: {
            left: 8,
            right: 8
          }
        },

        scales: {
          x: {
            offset: true,
            barPercentage: 1,
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            max: 5,
            ticks: { stepSize: 1 }
          }
        },

        plugins: {
          legend: { display: false }
        }
      }
    });
  });
};


onMounted(async () => {
  await fetchProfile();
  await fetchRawStats();
  await fetchCourses();
  await renderCharts();
});
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.profile-info,
.courses-stats {
  width: 100%;
  max-width: 1000px;
  background: #ffffffcc;
  border: 2px solid #3498db;
  border-radius: 20px;
  padding: 25px 30px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.profile-info:hover,
.courses-stats:hover {
  transform: translateY(-4px);
  border-color: #2980b9;
}

.course-chart-wrapper {
  margin-bottom: 40px;
}

canvas {
  max-width: 100%;
  height: 300px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
