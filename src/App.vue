<script setup lang="ts">
// Генерация точек
const dotCount = 80;
const dots = Array.from({ length: dotCount }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: `${8 + Math.random() * 4}s`,
  delay: `${Math.random() * 3}s`
}));

// Генерация фигур: по 3 каждого типа слева и справа
const shapes: Array<{ type: string; x: number; y: number; size: number; outline: boolean; duration: string; delay: string }> = [];
const types = ['circle', 'square', 'triangle'];
types.forEach(type => {
  for (let i = 0; i < 3; i++) {
    // слева
    shapes.push({
      type,
      x: Math.random() * 12 + 2,      // 2–14%
      y: Math.random() * 80 + 10,
      size: 30 + Math.random() * 70,  // 30–100px
      outline: Math.random() < 0.5,
      duration: `${10 + Math.random() * 6}s`,
      delay: `${Math.random() * 4}s`
    });
    // справа
    shapes.push({
      type,
      x: Math.random() * 12 + 86,     // 86–98%
      y: Math.random() * 80 + 10,
      size: 30 + Math.random() * 70,
      outline: Math.random() < 0.5,
      duration: `${10 + Math.random() * 6}s`,
      delay: `${Math.random() * 4}s`
    });
  }
});
</script>

<template>
  <div class="background">
    <div class="content">
      <router-view />
    </div>

    <!-- Фигуры -->
    <div v-for="(s, i) in shapes" :key="i"
         :class="['shape', s.type, s.outline ? 'outline' : 'solid']"
         :style="{
        top: s.y + '%',
        left: s.x + '%',
        width: s.type === 'triangle' ? '0' : s.size + 'px',
        height: s.type === 'triangle' ? '0' : s.size + 'px',
        borderWidth: s.outline ? '2px' : '0',
        animation: `driftRotate ${s.duration} ease-in-out ${s.delay} infinite`
      }" />

    <!-- Точки -->
    <div v-for="(d, i) in dots" :key="i"
         class="dot"
         :style="{
        top: d.y + '%',
        left: d.x + '%',
        animation: `swayRotate ${d.duration} ease-in-out ${d.delay} infinite`
      }" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  overflow: auto;
}

.background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 2;
}

.shape,
.dot {
  position: absolute;
  z-index: 1;
  opacity: 0.25;
  pointer-events: none;
}

/* Шейпы */
.shape.circle.solid {
  background: #2575fc;
  border-radius: 50%;
}
.shape.circle.outline {
  border: 2px solid #2575fc;
  border-radius: 50%;
  background: transparent;
}

.shape.square.solid {
  background: #6a11cb;
}
.shape.square.outline {
  border: 2px solid #6a11cb;
  background: transparent;
}

.shape.triangle.solid {
  width: 0;
  height: 0;
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;
  border-bottom: 1em solid #89f7fe;
}
.shape.triangle.outline {
  width: 0;
  height: 0;
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;
  border-bottom: 1em solid transparent;
  box-shadow: inset 0 0 0 2px #89f7fe;
}

.dot {
  width: 5px;
  height: 5px;
  background: #2575fc;
  border-radius: 50%;
}

/* Анимация driftRotate: комбинирует дрейф и вращение */
@keyframes driftRotate {
  0% { transform: translate(0,0) rotate(0deg); }
  25% { transform: translate(5px,10px) rotate(90deg); }
  50% { transform: translate(0,20px) rotate(180deg); }
  75% { transform: translate(-5px,10px) rotate(270deg); }
  100% { transform: translate(0,0) rotate(360deg); }
}

/* Анимация swayRotate для точек: более тихое движение */
@keyframes swayRotate {
  0% { transform: translate(0,0) rotate(0deg); }
  50% { transform: translateX(8px) rotate(180deg); }
  100% { transform: translate(0,0) rotate(360deg); }
}
</style>