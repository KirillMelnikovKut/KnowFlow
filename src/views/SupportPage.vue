<template>
  <section class="section-support">
    <div class="support-card">
      <header class="support-header">
        <UITItile text="Поддержка" size="large" color="#07286f" />
        <UITItile text="Опишите проблему или предложите улучшение" size="small" color="#767676" />
      </header>

      <form @submit.prevent="sendSupportMessage" class="support-form">
        <div class="form-group">
          <label class="support-label">
            Тема:
            <input
                v-model="subject"
                type="text"
                class="support-input"
                placeholder="Введите тему сообщения"
                required
            />
          </label>
        </div>

        <div class="form-group">
          <label class="support-label">
            Сообщение:
            <textarea
                v-model="message"
                class="support-textarea"
                rows="6"
                placeholder="Опишите вашу проблему или предложение"
                required
            ></textarea>
          </label>
        </div>

        <button type="submit" class="support-button">
          <span class="button-text">Отправить</span>
          <svg class="button-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M20 12L15 7M20 12L15 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>

      <transition name="fade">
        <p v-if="submitted" class="support-success">
          <svg class="success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.42L9 19 21 7l-1.42-1.42L9 16.17z" fill="currentColor"/>
          </svg>
          Спасибо за ваше сообщение! Мы свяжемся с вами при необходимости.
        </p>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UITItile from '@/UI/UITItile.vue'

const subject = ref('')
const message = ref('')
const submitted = ref(false)

function sendSupportMessage() {
  console.log('Отправлено:', { subject: subject.value, message: message.value })

  submitted.value = true
  setTimeout(() => submitted.value = false, 5000)

  subject.value = ''
  message.value = ''
}
</script>

<style scoped lang="scss">
.section-support {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.support-card {
  max-width: 1000px;
  width: 100%;
  border: 1px solid #6c96ff;
  border-radius: 24px;
  padding: 48px;
  box-sizing: border-box;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    pointer-events: none;
  }
}

.support-header {
  margin-bottom: 24px;
}

.support-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.support-label {
  font-size: 16px;
  color: #07286f;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.support-input,
.support-textarea {
  padding: 16px;
  border: 2px solid #dde4f0;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9fafb;
  outline: none;

  &:focus {
    border-color: #678AD6;
    box-shadow: 0 0 8px rgba(103, 138, 214, 0.3);
  }

  &::placeholder {
    color: #a3aebc;
  }
}

.support-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #678AD6, #4a6dc7);
  color: white;
  border: none;
  border-radius: 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(103, 138, 214, 0.3);
  will-change: transform;

  .button-text {
    position: relative;
    z-index: 1;
  }

  .button-icon {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    background: linear-gradient(135deg, #4a6dc7, #3a57a3);

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 2px 8px rgba(103, 138, 214, 0.3);
  }
}

.support-success {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #22c55e;
  font-size: 16px;
  font-weight: 500;
  margin-top: 24px;
  animation: slide-up 0.5s ease-out;

  .success-icon {
    flex-shrink: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>