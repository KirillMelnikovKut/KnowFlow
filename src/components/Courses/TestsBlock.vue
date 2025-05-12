<template>
  <div class="test-block">
    <h3>Тест:</h3>
    <div v-for="(question, index) in questions" :key="question.id" class="question" :style="{ animationDelay: `${(index + 1) * 0.2}s` }">
      <p>{{ question.text }}</p>
      <ul>
        <li v-for="answer in question.answer_options" :key="answer.id">
          <label>
            <input
                type="radio"
                :name="`question-${question.id}`"
                :value="answer.id"
                v-model="selectedAnswers[question.id]"
            />
            {{ answer.text }}
          </label>
        </li>
      </ul>
    </div>
    <button @click="checkAnswers">Проверить</button>
    <p v-if="score !== null">Ваш результат: {{ score }} / {{ questions.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import api from "@/api";

const props = defineProps<{
  questions: any[],
  blockId: number,
}>();

const selectedAnswers = ref<{ [key: number]: number }>({});
const score = ref<number | null>(null);

const checkAnswers = async () => {
  let correctCount = 0;

  for (const question of props.questions) {
    const selectedAnswerId = selectedAnswers.value[question.id];
    const correctAnswer = question.answer_options.find((opt: any) => opt.is_correct);

    if (correctAnswer && selectedAnswerId === correctAnswer.id) {
      correctCount++;
    }
  }
  await api.post(`/statistics`, { block_id: props.blockId, statistics: correctCount });
  score.value = correctCount;
};
</script>

<style scoped>
.test-block {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border: 2px solid #3498db;
  border-radius: 16px;
  transition: border-color 0.3s ease;
}

.test-block:hover {
  border-color: #2980b9;
}

.question {
  margin-bottom: 15px;
  opacity: 0;
  animation: slide-in 0.5s forwards;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
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
