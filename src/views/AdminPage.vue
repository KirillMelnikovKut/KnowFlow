<template>
  <div class="wizard-page">
    <section v-if="!accessGranted" class="wizard-section">
      <h2>Введите пароль администратора</h2>
      <input
          v-model="adminPassword"
          type="password"
          placeholder="Пароль"
          class="input"
          @keyup.enter="verifyPassword"
      />
      <button @click="verifyPassword" class="btn">Войти</button>
      <p v-if="passwordError" class="error-msg">Неверный пароль, попробуйте снова.</p>
    </section>

    <div v-else>
      <h1>Создание нового курса</h1>
      <div v-if="accessDenied" class="no-access">
        <p>У вас нет доступа. Только администратор может создавать курсы.</p>
      </div>

      <template v-else>
        <section v-if="step === 1" class="wizard-section">
          <h2>1. Данные курса</h2>
          <input v-model="course.title" placeholder="Название" class="input" />
          <textarea v-model="course.description" placeholder="Описание" class="input" />
          <input v-model="course.video" placeholder="Ссылка на видео" class="input" />
          <button @click="createCourse" class="btn">Создать курс</button>
        </section>

        <section v-if="step === 2" class="wizard-section">
          <h2>2. Добавление блока</h2>
          <input v-model="block.title" placeholder="Заголовок блока" class="input" />
          <textarea v-model="block.content" placeholder="Контент блока" class="input" />
          <input v-model.number="block.order" placeholder="Порядок" class="input" type="number" />
          <button @click="addBlock" class="btn">Добавить блок</button>

          <div v-if="createdBlocks.length">
            <h3>Добавленные блоки:</h3>
            <ul>
              <li v-for="b in createdBlocks" :key="b.id">📦 {{ b.title }}</li>
            </ul>
          </div>

          <button class="btn mt-4" @click="nextStep" :disabled="!createdBlocks.length">Продолжить →</button>
        </section>

        <section v-if="step === 3" class="wizard-section">
          <h2>3. Вопросы к блоку</h2>
          <select v-model="selectedBlockId" class="input">
            <option disabled value="">Выберите блок</option>
            <option v-for="b in createdBlocks" :value="b.id" :key="b.id">{{ b.title }}</option>
          </select>
          <input v-model="question.text" placeholder="Текст вопроса" class="input" />
          <input v-model.number="question.order" placeholder="Порядок" class="input" type="number" />
          <button @click="addQuestion" class="btn">Добавить вопрос</button>

          <div v-if="createdQuestions.length">
            <h3>Добавленные вопросы:</h3>
            <ul>
              <li v-for="q in createdQuestions" :key="q.id">❓ {{ q.text }}</li>
            </ul>
          </div>

          <button class="btn mt-4" @click="nextStep" :disabled="!createdQuestions.length">Продолжить →</button>
        </section>

        <section v-if="step === 4" class="wizard-section">
          <h2>4. Варианты ответов</h2>
          <select v-model="selectedQuestionId" class="input">
            <option disabled value="">Выберите вопрос</option>
            <option v-for="q in createdQuestions" :value="q.id" :key="q.id">{{ q.text }}</option>
          </select>
          <input v-model="answer.text" placeholder="Текст ответа" class="input" />
          <label class="flex items-center mb-2">
            <input type="checkbox" v-model="answer.is_correct" class="mr-2" /> Правильный ответ
          </label>
          <button @click="addAnswer" class="btn">Добавить ответ</button>
        </section>

        <div v-if="step === 4" class="wizard-section flex justify-between">
          <button @click="createAnother" class="btn">Создать еще один курс</button>
          <button @click="goHome" class="btn">Вернуться на главную</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api'

const router = useRouter()
const step = ref(1)
const accessDenied = ref(false)
const adminPassword = ref('')
const accessGranted = ref(false)
const passwordError = ref(false)

const course = ref({ title: '', description: '', video: '' })
const block = ref({ title: '', content: '', order: 0 })
const question = ref({ text: '', order: 0 })
const answer = ref({ text: '', is_correct: false })

const courseId = ref<number | null>(null)
const createdBlocks = ref<Array<any>>([])
const selectedBlockId = ref<number | ''>('')
const createdQuestions = ref<Array<any>>([])
const selectedQuestionId = ref<number | ''>('')

const verifyPassword = () => {
  const SECRET = 'admin123'
  if (adminPassword.value === SECRET) {
    accessGranted.value = true
    passwordError.value = false
  } else {
    passwordError.value = true
  }
}

function handleApiError(error: any) {
  if (error.response?.status === 403) {
    accessDenied.value = true
    step.value = 1
  }
  console.error(error)
}

const createCourse = async () => {
  try {
    const { data } = await apiClient.post('/courses/', course.value)
    courseId.value = data.id
    step.value = 2
  } catch (e: any) {
    handleApiError(e)
  }
}

const addBlock = async () => {
  if (!courseId.value) return
  try {
    const payload = { ...block.value, course_id: courseId.value }
    const { data } = await apiClient.post(`/courses/${courseId.value}/blocks`, payload)
    createdBlocks.value.push(data)
    block.value = { title: '', content: '', order: 0 }
  } catch (e: any) {
    handleApiError(e)
  }
}

const addQuestion = async () => {
  if (!courseId.value || !selectedBlockId.value) return
  try {
    const payload = { ...question.value, block_id: selectedBlockId.value }
    const { data } = await apiClient.post(
        `/courses/${courseId.value}/blocks/${selectedBlockId.value}/questions`,
        payload
    )
    createdQuestions.value.push(data)
    question.value = { text: '', order: 0 }
  } catch (e: any) {
    handleApiError(e)
  }
}

const addAnswer = async () => {
  if (!courseId.value || !selectedBlockId.value || !selectedQuestionId.value) return
  try {
    const payload = { ...answer.value, question_id: selectedQuestionId.value }
    await apiClient.post(
        `/courses/${courseId.value}/blocks/${selectedBlockId.value}/questions/${selectedQuestionId.value}/answers`,
        payload
    )
    answer.value = { text: '', is_correct: false }
  } catch (e: any) {
    handleApiError(e)
  }
}

const nextStep = () => step.value++

const createAnother = () => {
  course.value = { title: '', description: '', video: '' }
  block.value = { title: '', content: '', order: 0 }
  question.value = { text: '', order: 0 }
  answer.value = { text: '', is_correct: false }
  courseId.value = null
  createdBlocks.value = []
  createdQuestions.value = []
  selectedBlockId.value = ''
  selectedQuestionId.value = ''
  accessGranted.value = false
  step.value = 1
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.wizard-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
  padding: 20px;
}

.wizard-section {
  width: 100%;
  max-width: 800px;
  background: #ffffffcc;
  border: 2px solid #3498db;
  border-radius: 20px;
  padding: 25px 30px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.wizard-section:hover {
  transform: translateY(-4px);
  border-color: #2980b9;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

h3 {
  font-size: 1.25rem;
  margin-top: 15px;
  color: #2c3e50;
}

.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.btn {
  background-color: #3498db;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}

.mt-4 {
  margin-top: 1rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
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
