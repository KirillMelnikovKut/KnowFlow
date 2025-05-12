<template>
  <section class="course-page">
    <div class="block-selector">
      <div class="button-group">
        <button
            v-for="(block, index) in blocks"
            :key="block.id"
            :class="{ active: selectedBlockId === block.id }"
            @click="selectedBlockId = block.id"
            :style="{ animationDelay: `${(index + 1) * 0.2}s` }"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>

    <div v-if="selectedBlock" class="block-content">
      <h2>{{ selectedBlock.title }}</h2>
      <div v-html="convertToHtml(selectedBlock.content)"></div>
    </div>

    <TestsBlock v-if="selectedBlock?.questions.length" :questions="selectedBlock.questions" :blockId="selectedBlock.id" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/api";
import { convertToHtml } from "@/utils/utils.ts";
import TestsBlock from "@/components/Courses/TestsBlock.vue";

const route = useRoute();
const blocks = ref<{ id: number; title: string; content: string; order: number; questions: any[] }[]>([]);
const selectedBlockId = ref<number | null>(null);

onMounted(async () => {
    const response = await api.get(`/courses/${route.params.courseId}/blocks`);
    blocks.value = response.data;
    if (blocks.value.length) {
      selectedBlockId.value = blocks.value[0].id;
    }
});

const selectedBlock = computed(() =>
    blocks.value.find((block) => block.id === selectedBlockId.value)
);
</script>

<style scoped>
.course-page {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button-group {
  display: flex;
  gap: 8px;
}

.button-group button {
  padding: 12px 18px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease, border-color 0.3s ease;
  opacity: 0;
  animation: slide-in 0.5s forwards;
}

.button-group button:hover {
  transform: scale(1.05);
}

.button-group button:active {
  transform: scale(0.95);
}

.button-group button.active {
  background-color: #3498db;
  color: #fff;
  border-color: #3498db;
}

.block-content {
  background: #fff;
  border: 2px solid #3498db;
  padding: 15px;
  border-radius: 16px;
  transition: border-color 0.3s ease;
  animation: slide-in 0.5s forwards;
}

.block-content:hover {
  border-color: #2980b9;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
