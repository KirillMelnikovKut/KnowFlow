<template>
  <div class="career-matcher-page">
    <h1>Кем из IT‑специалистов вы могли бы стать?</h1>

    <section v-if="step === 1" class="step-section">
      <h2>Шаг 1: Распределите навыки по специализациям</h2>
      <div class="content-grid">
        <div class="drag-list">
          <h3>Навыки / Интересы</h3>
          <div v-for="item in unassigned" :key="item.id" class="item" draggable="true" @dragstart="onDragStart(item)">
            {{ item.name }}
          </div>
        </div>
        <div class="drop-zones">
          <div v-for="spec in specialties" :key="spec.key" class="drop-zone" @dragover.prevent @drop="onDrop(spec.key)">
            <h4>{{ spec.name }}</h4>
            <div v-if="matches[spec.key].length === 0" class="placeholder">Перетащите сюда...</div>
            <ul>
              <li v-for="it in matches[spec.key]" :key="it.id" class="matched-item">
                {{ it.name }}
                <button class="remove-btn" @click="removeMatch(spec.key, it)">&times;</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" :disabled="!allMatched" @click="nextStep">Далее</button>
    </section>

    <section v-else-if="step === 2" class="step-section">
      <h2>Шаг 2: Короткий опрос</h2>
      <div v-for="(q, idx) in questions" :key="idx" class="question-block">
        <p>{{ q.text }}</p>
        <div class="options">
          <label v-for="(opt, i) in q.options" :key="i">
            <input type="radio" :name="'q'+idx" :value="i" v-model.number="answers[idx]" /> {{ opt }}
          </label>
        </div>
      </div>
      <button class="btn btn-primary" :disabled="!allAnswered" @click="nextStep">Посмотреть результат</button>
    </section>

    <section v-else class="step-section result-section">
      <h2>Ваш результат</h2>
      <ul>
        <li v-for="spec in specialties" :key="spec.key">
          <strong>{{ spec.name }}:</strong> {{ matches[spec.key].length }} навыков + {{ bonus[spec.key] }} баллов вопросов = <strong>{{ score[spec.key] }} очков</strong>
        </li>
      </ul>
      <canvas id="scoreChart"></canvas>
      <p class="recommendation">Мы рекомендуем: <span>{{ recommended }}</span></p>
      <div class="btn-group">
        <button class="btn btn-secondary" @click="restart">Пройти заново</button>
        <button class="btn btn-secondary" @click="goHome">Вернуться на главную</button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'

const router = useRouter()
const specialties = [
  { key: 'frontend', name: 'Frontend‑разработчик' },
  { key: 'backend',  name: 'Backend‑разработчик'  },
  { key: 'devops',   name: 'DevOps‑инженер'       },
  { key: 'datasci',  name: 'Data Scientist'       },
]

const initialItems = [
  { id: 1, name: 'HTML/CSS/JS'      },
  { id: 2, name: 'Node.js/Express'  },
  { id: 3, name: 'CI/CD и Docker'   },
  { id: 4, name: 'Анализ данных'    },
  { id: 5, name: 'UX/UI дизайн'     },
  { id: 6, name: 'SQL и базы данных'},
  { id: 7, name: 'Скрипты автоматизации' },
  { id: 8, name: 'ML/статистика'    },
]

const questions = [
  { text: 'Что вам ближе: создавать красивые интерфейсы или оптимизировать серверную логику?', options: ['Интерфейсы', 'Сервер', 'Ни то, ни другое'] },
  { text: 'Вам интересно: настройка облаков и деплой или построение отчетов и моделей?', options: ['Облака/деплой', 'Отчёты/модели', 'Оба варианта'] },
  { text: 'Какой язык программирования вам больше по душе?', options: ['JavaScript', 'Python', 'Go', 'Не имею предпочтений'] },
  { text: 'Предпочитаете ли вы работать с данными или инфраструктурой?', options: ['Данные', 'Инфраструктура', 'Любое'] },
]

const step = ref(1)
const dragged = ref(null)
const matches = reactive({ frontend: [], backend: [], devops: [], datasci: [] })
const unassigned = ref([...initialItems])
const answers = reactive(Array(questions.length).fill(null))
let chartInstance = null

function onDragStart(item) { dragged.value = item }
function onDrop(specKey) {
  if (dragged.value) {
    unassigned.value = unassigned.value.filter(i => i.id !== dragged.value.id)
    matches[specKey].push(dragged.value)
    dragged.value = null
  }
}
function removeMatch(specKey, item) {
  matches[specKey] = matches[specKey].filter(i => i.id !== item.id)
  unassigned.value.push(item)
}

const allMatched = computed(() => unassigned.value.length === 0)
const allAnswered = computed(() => answers.every(a => a !== null))
function nextStep() { step.value++ }

const bonus = computed(() => {
  const b = { frontend:0, backend:0, devops:0, datasci:0 }
  if (answers[0] === 0) b.frontend += 2
  else if (answers[0] === 1) b.backend += 2
  if (answers[1] === 0) b.devops += 2
  else if (answers[1] === 1) b.datasci += 2
  if (answers[2] === 0) b.frontend += 1
  else if (answers[2] === 1) b.datasci += 1
  else if (answers[2] === 2) b.devops += 1
  if (answers[3] === 0) b.datasci += 1
  else if (answers[3] === 1) b.devops += 1
  return b
})
const score = computed(() => {
  const s = {}
  specialties.forEach(spe => { s[spe.key] = matches[spe.key].length + bonus.value[spe.key] })
  return s
})
const recommended = computed(() => {
  const best = specialties.reduce((prev, cur) => score.value[cur.key] > score.value[prev.key] ? cur : prev, specialties[0])
  return best.name
})

function restart() {
  step.value = 1
  unassigned.value = [...initialItems]
  specialties.forEach(s => matches[s.key] = [])
  answers.fill(null)
  if (chartInstance) chartInstance.destroy()
}
function goHome() {
  router.push('/')
}

function renderChart() {
  const ctx = document.getElementById('scoreChart').getContext('2d')
  const labels = specialties.map(s => s.name)
  const data = specialties.map(s => score.value[s.key])
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Очки по специализациям', data }] },
    options: { responsive: true, maintainAspectRatio: false }
  })
}

watch(step, (newStep) => {
  if (newStep === 3) {
    onMounted(() => renderChart())
  }
})
</script>

<style scoped>
.career-matcher-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
  text-shadow: 1px 1px 4px rgba(44,62,80,0.3);
}

.step-section {
  width: 100%;
  max-width: 800px;
  background: rgba(255,255,255,0.9);
  border: 2px solid #3498db;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  min-height: 400px;
}
.step-section:hover {
  transform: translateY(-4px);
  border-color: #2980b9;
}

.content-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.drag-list {
  flex: 1;
  background: #ffffffcc;
  border: 2px solid #3498db;
  border-radius: 10px;
  padding: 15px;
}
.drag-list h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.item {
  background: #3498db;
  color: white;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: grab;
}

.drop-zones {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.drop-zone {
  background: #ffffffcc;
  border: 2px dashed #3498db;
  border-radius: 10px;
  min-height: 120px;
  padding: 10px;
}
.drop-zone h4 {
  margin-bottom: 8px;
  color: #2c3e50;
}
.placeholder {
  font-style: italic;
  color: #7f8c8d;
}
.matched-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ecf0f1;
  padding: 6px;
  margin-bottom: 6px;
  border-radius: 4px;
}
.remove-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #c0392b;
  cursor: pointer;
}

.question-block {
  margin-bottom: 15px;
}
.options label {
  display: inline-block;
  margin-right: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  border: none;
  margin-right: 10px;
}
.btn-primary {
  background: #3498db;
  color: white;
}
.btn-primary:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}
.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-secondary {
  background: #2ecc71;
  color: white;
}
.btn-secondary:hover {
  background: #27ae60;
}

.result-section ul {
  list-style: inside disc;
  margin-bottom: 20px;
}
.recommendation {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

#scoreChart {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}
.btn-group {
  display: flex;
  justify-content: center;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
